import { createBaser, createBuilder, createInserter } from '@/server/typeorm'
import { TableUser } from '@/server/typeorm/database'
import { divineEventValidator } from '@/server/utils/utils-validator'
import { divineEventCatcher, divineCatchWherer } from '@/server/utils/utils-handler'
import { IsNotEmpty } from 'class-validator'
import bcrypt from 'bcryptjs'

export class BodySchema extends TableUser {
    @IsNotEmpty({ message: '邮箱/手机号 必填', groups: ['account'] })
    account: string

    @IsNotEmpty({ message: 'Token 必填', groups: ['token'] })
    token: string
}

export default defineEventHandler(event => {
    return divineEventCatcher(event, async evt => {
        const body = await readBody<BodySchema>(event)
        await divineEventValidator(BodySchema, {
            data: body,
            option: { groups: ['account', 'password'] }
        })
        /**查询登录用户**/
        const node = await createBuilder(event.context.db, TableUser, async qb => {
            qb.addSelect('tb.password')
            qb.where('tb.email = :email', { email: body.account })
            qb.orWhere('tb.mobile = :mobile', { mobile: body.account })
            qb.andWhere('tb.status IN(:...status)', { status: ['enable', 'disable'] })
            return await qb.getOne()
        }).then(async data => {
            await divineCatchWherer(!Boolean(data), {
                message: '用户未注册'
            })
            await divineCatchWherer(data.status === 'disable', {
                message: '账户已被禁用'
            })
            await divineCatchWherer(!bcrypt.compareSync(body.password, data.password), {
                message: '账户密码错误'
            })
            return data
        })
        return { message: '登录成功', node }
    })
})
