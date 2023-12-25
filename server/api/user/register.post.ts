import { IsNotEmpty } from 'class-validator'
import { createBaser, createInserter } from '@/server/typeorm'
import { TableUser } from '@/server/typeorm/database'
import { divineEventValidator } from '@/server/utils/utils-validator'
import { divineEventCatcher } from '@/server/utils/utils-handler'
import { divineIntNumber } from '@/server/utils/utils-common'

export class IRegister extends TableUser {
    @IsNotEmpty({ message: 'Token 验证码必填', groups: ['token'] })
    token: string
}

export default defineEventHandler(event => {
    return divineEventCatcher(event, async evt => {
        const body = await readBody<IRegister>(event)
        await divineEventValidator(TableUser, {
            data: body,
            option: {
                groups: ['nickname', 'email', 'password', 'token']
            }
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
