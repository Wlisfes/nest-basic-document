import { createBaser, createBuilder, inserter } from '@/server/lib/typeorm'
import { TableUser, TableUserGitHub } from '@/server/database'
import { downloadFileBuffer, uploadFileBuffer, createRename } from '@/server/lib/ali-oss'
import { divineWhereCatcher } from '@/server/utils/utils-validator'
import { divineJwtSignAuthorize } from '@/server/utils//utils-handler'
import { divineIntNumber } from '@/utils/utils-common'
import { IsNotEmpty } from 'class-validator'

export class QuerySchema extends TableUser {
    @IsNotEmpty({ message: 'code 必填', groups: ['code'] })
    code: string
}

export interface GitHubAuthorize {
    access_token: string
    token_type: string
    scope: string
}

export interface GitHubResolver {
    id: number
    login: string
    url: string
    html_url: string
    avatar_url: string
    bio: string
    name: string
    email: string
    location: string
    blog: string
}

/**GitHub授权**/
export async function httpGitHubAuthorize(body: { client_id: string; client_secret: string; code: string }) {
    try {
        const result = await $fetch<GitHubAuthorize>(`https://github.com/login/oauth/access_token`, {
            method: 'POST',
            body: body,
            timeout: 60000,
            headers: { accept: 'application/json' }
        })
        await divineWhereCatcher(!result || !result.access_token, {
            data: result,
            message: '授权失败'
        })
        return result
    } catch (err) {
        throw createError({ statusCode: 400, message: '授权失败', data: err })
    }
}

/**GitHub信息拉取**/
export async function httpGitHubResolver(body: { token: string }) {
    try {
        const result = await $fetch<GitHubResolver>(`https://api.github.com/user`, {
            method: 'GET',
            headers: { Authorization: body.token }
        })
        await divineWhereCatcher(!result || !result.id || !result.login, {
            message: '用户信息授权失败',
            data: result
        })
        return result
    } catch (err) {
        throw createError({ statusCode: 400, message: '用户信息授权失败', data: err })
    }
}

export default defineEventHandler(async event => {
    try {
        const state = await getQuery<{ code: string }>(event)
        await divineValidator(QuerySchema, {
            data: state,
            option: { groups: ['code'] }
        })
        //GitHub授权验证
        const config = useRuntimeConfig()
        const node = await httpGitHubAuthorize({
            client_id: config.GITHUB_CLIENT_ID,
            client_secret: config.GITHUB_CLIENT_SECRET,
            code: state.code
        }).then(async result => {
            return await httpGitHubResolver({
                token: `${result.token_type} ${result.access_token}`
            })
        })

        /**查询是否已经注册****************************************************************************/
        const post = await createBuilder(event.context.db, TableUserGitHub, async qb => {
            return await qb.where('t.id = :id', { id: node.id }).getOne()
        })
        /**已注册、生成JWT**********************/
        if (post) {
            return await createBuilder(event.context.db, TableUser, async qb => {
                return await qb.addSelect('t.password').where('t.uid = :uid', { uid: post.uid }).getOne()
            }).then(async ({ nickname, status, password }) => {
                await divineWhereCatcher(status === 'disable', {
                    message: '账户已被禁用'
                })
                const { token, expire } = await divineJwtSignAuthorize({ uid: post.uid, nickname, status, password })
                await setCookie(event, 'APP_NUXT_TOKEN', token, { maxAge: expire })
                return await sendRedirect(event, '/', 301)
            })
        }

        /**未注册、查询当前邮箱是否已存在******************************************************/
        return await createBuilder(event.context.db, TableUser, async qb => {
            qb.addSelect('t.password').where('t.email = :email', { email: node.email })
            return await qb.getOne()
        }).then(async have => {
            if (have) {
                await divineWhereCatcher(have.status === 'disable', {
                    message: '账户已被禁用'
                })
                //邮箱已存在、已注册直接返回token
                const { token, expire } = await divineJwtSignAuthorize({
                    uid: post.uid,
                    nickname: have.nickname,
                    status: have.status,
                    password: have.password
                })
                await setCookie(event, 'APP_NUXT_TOKEN', token, { maxAge: expire })
                return await sendRedirect(event, '/', 301)
            }

            //邮箱不存在、执行新用户注册-----------------------------------------------------------------
            return await createBaser(event.context.db, TableUser).then(async model => {
                //头像存储到oss
                const { buffer, suffix } = await downloadFileBuffer(node.avatar_url)
                const oss = await uploadFileBuffer(event.context.ossClient, {
                    fileName: await createRename('avatar', suffix),
                    buffer: buffer
                })
                const { uid } = await inserter(model, {
                    uid: await divineIntNumber(16),
                    nickname: node.login,
                    email: node.email,
                    avatar: oss.fileURL,
                    password: `MTIzNDU2`
                })
                //存储GitHub数据
                await createBaser(event.context.db, TableUserGitHub).then(async model => {
                    return await inserter(model, {
                        uid: uid,
                        id: node.id,
                        login: node.login,
                        avatar: node.avatar_url,
                        bio: node.bio,
                        url: node.url,
                        home: node.html_url,
                        name: node.name,
                        email: node.email,
                        location: node.location,
                        blog: node.blog
                    })
                })
                //生成JWT
                return await createBuilder(event.context.db, TableUser, async qb => {
                    qb.addSelect('t.password')
                    qb.where('t.uid = :uid', { uid: uid })
                    return await qb.getOne()
                }).then(async ({ nickname, status, password }) => {
                    const { token, expire } = await divineJwtSignAuthorize({ uid, nickname, status, password })
                    await setCookie(event, 'APP_NUXT_TOKEN', token, { maxAge: expire })
                    return await sendRedirect(event, '/', 301)
                })
            })
        })
    } catch (e) {
        return await sendRedirect(event, '/', 301)
    }
})
