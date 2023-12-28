import { createBaser, createInserter } from '@/server/typeorm'
import { TableUser } from '@/server/typeorm/database'
import { divineIntNumber } from '@/utils/utils-common'
import { IsNotEmpty } from 'class-validator'

export class BodySchema extends TableUser {
    @IsNotEmpty({ message: '验证码 必填', groups: ['code'] })
    code: string
}

export default defineEventHandler(event => {
    return divineEventCatcher(event, async evt => {
        const body = await readBody<BodySchema>(event)
        await divineEventValidator(BodySchema, {
            data: body,
            option: { groups: ['nickname', 'email', 'password', 'code'] }
        })
        return await createBaser(event.context.db, TableUser).then(async model => {
            await createInserter(model, {
                uid: await divineIntNumber(16),
                nickname: body.nickname,
                email: body.email,
                password: body.password
            })
            return { message: '注册成功' }
        })
    })
})
