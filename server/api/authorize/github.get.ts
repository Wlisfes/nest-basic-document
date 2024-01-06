import { createBaser, createInserter } from '@/server/lib/typeorm'
import { TableUser } from '@/server/database'
import { downloadFileBuffer, uploadFileBuffer, createRename } from '@/server/lib/ali-oss'
import { divineEventWhereCatcher } from '@/server/utils/utils-validator'
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
    error?: string
}

export interface GitHubResolver {
    id: number
    login: string
    url: string
    html_url: string
    avatar_url: string
    bio: string
    bame: string
    email: string
}

/**GitHub授权**/
export async function httpGitHubAuthorize(body: { client_id: string; client_secret: string; code: string }) {
    try {
        const result = await $fetch<GitHubAuthorize>(`https://github.com/login/oauth/access_token`, {
            method: 'POST',
            headers: { accept: 'application/json' },
            body: body
        })
        return divineEventWhereCatcher(Boolean(result.error), { data: result, message: '授权失败' }).then(() => {
            return result
        })
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
        return divineEventWhereCatcher(!Boolean(result.id) || !Boolean(result.login), {
            message: '用户信息授权失败',
            data: result
        }).then(() => {
            return result
        })
    } catch (err) {
        throw createError({ statusCode: 400, message: '用户信息授权失败', data: err })
    }
}

// const { buffer, suffix } = await downloadFileBuffer(`https://avatars.githubusercontent.com/u/32263302?v=4`)
// const result = await uploadFileBuffer(event.context.ossClient, {
//     fileName: await createRename(`document/avatar/`, suffix),
//     buffer: buffer
// })

export default defineEventHandler(async event => {
    return await divineEventCatcher(event, async evt => {
        const state = await getQuery<{ code: string }>(event)
        await divineEventValidator(QuerySchema, {
            data: state,
            option: { groups: ['code'] }
        })
        const config = useRuntimeConfig()
        const { token_type, access_token } = await httpGitHubAuthorize({
            client_id: config.GITHUB_CLIENT_ID,
            client_secret: config.GITHUB_CLIENT_SECRET,
            code: state.code
        })
        const result = await httpGitHubResolver({ token: `${token_type} ${access_token}` })
    })
})
