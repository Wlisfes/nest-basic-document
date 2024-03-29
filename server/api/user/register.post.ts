import { IsNotEmpty, isEmpty } from 'class-validator'
import { TableUser } from '@/server/database'
import { createBaser, createBuilder, inserter } from '@/server/lib/typeorm'
import { SourceEnum, getStorage, delStorage } from '@/server/lib/nodemailer'
import { divineParameter, divineValidator, divineWhereCatcher } from '@/server/utils/utils-validator'
import { divineIntNumber } from '@/utils/utils-common'

export class BodySchema extends TableUser {
    @IsNotEmpty({ message: '验证码 必填', groups: ['code'] })
    code: string
}

export default defineEventHandler(async event => {
    const state = await divineParameter(await readBody<BodySchema>(event)).then(async json => {
        return await divineValidator(BodySchema, {
            data: json,
            option: { groups: ['nickname', 'email', 'password', 'code'] }
        })
    })
    /**邮件验证码验证**/
    await getStorage(SourceEnum.Register, { email: state.email }).then(async code => {
        return await divineWhereCatcher(isEmpty(code) || code != state.code, {
            message: '验证码错误'
        })
    })
    /**邮箱号验证**/
    await createBuilder(event.context.db, TableUser, async qb => {
        qb.where('t.email = :email', { email: state.email })
        return await qb.getOne()
    }).then(async node => {
        return await divineWhereCatcher(Boolean(node), {
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
        return await delStorage(SourceEnum.Register, { email: state.email }).then(() => {
            return { message: '注册成功' }
        })
    })
})
