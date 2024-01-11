import { IsNotEmpty, isEmpty } from 'class-validator'
import { TableUser } from '@/server/database'
import { createBaser, createBuilder, inserter } from '@/server/lib/typeorm'
import { SourceEnum, getStorage } from '@/server/lib/nodemailer'
import { divineEventCatcher, divineEventValidator, divineEventWhereCatcher } from '@/server/utils/utils-validator'
import { divineIntNumber } from '@/utils/utils-common'

export class BodySchema extends TableUser {
    @IsNotEmpty({ message: '验证码 必填', groups: ['code'] })
    code: string
}

export default defineEventHandler(event => {
    return divineEventCatcher(event, async evt => {
        const state = await readBody<BodySchema>(event)
        await divineEventValidator(BodySchema, {
            data: state,
            option: { groups: ['nickname', 'email', 'password', 'code'] }
        })
        /**邮件验证码验证**/
        await getStorage(SourceEnum.Register, { email: state.email }).then(async code => {
            return await divineEventWhereCatcher(isEmpty(code) || code != state.code, {
                message: '验证码错误'
            })
        })
        /**邮箱号验证**/
        await createBuilder(event.context.db, TableUser, async qb => {
            qb.where('t.email = :email', { email: state.email })
            return await qb.getOne()
        }).then(async node => {
            return await divineEventWhereCatcher(Boolean(node), {
                message: '邮箱号已注册'
            })
        })
        /**数据入库**/
        return await createBaser(event.context.db, TableUser).then(async model => {
            await inserter(model, {
                uid: await divineIntNumber(16),
                nickname: state.nickname,
                email: state.email,
                password: state.password
            })
            return { message: '注册成功' }
        })
    })
})
