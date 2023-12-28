import { IsNotEmpty } from 'class-validator'
import { TableUser } from '@/server/typeorm/database'
import { createBuilder } from '@/server/typeorm'
import bcrypt from 'bcryptjs'

export class BodySchema extends TableUser {
    @IsNotEmpty({ message: '邮箱/手机号 必填', groups: ['account'] })
    account: string

    @IsNotEmpty({ message: 'Token 必填', groups: ['token'] })
    token: string
}

export default defineEventHandler(async event => {
    return await divineEventCatcher(event, async evt => {
        const state = await readBody<BodySchema>(event)
        await divineEventValidator(BodySchema, {
            data: state,
            option: { groups: ['account', 'password', 'token'] }
        })
        await divineEventSlideTokenValidator(event, state.token)

        /**查询登录用户**/
        const node = await createBuilder(event.context.db, TableUser, async qb => {
            qb.addSelect('t.password')
            qb.where('t.email = :email', { email: state.account })
            qb.orWhere('t.mobile = :mobile', { mobile: state.account })
            qb.andWhere('t.status IN(:...status)', { status: ['enable', 'disable'] })
            return await qb.getOne()
        }).then(async data => {
            await divineEventWhereCatcher(!Boolean(data), {
                code: 401,
                message: '用户未注册'
            })
            await divineEventWhereCatcher(data.status === 'disable', {
                code: 401,
                message: '账户已被禁用'
            })
            await divineEventWhereCatcher(!bcrypt.compareSync(state.password, data.password), {
                code: 401,
                message: '账户密码错误'
            })
            return data
        })
        return await divineJwtSignAuthorize({
            uid: node.uid,
            nickname: node.nickname,
            status: node.status,
            password: node.password
        }).then(({ token, expire }) => {
            return { token, expire, message: '登录成功' }
        })
    })
})
