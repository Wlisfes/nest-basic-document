import { createBaser, createInserter } from '@/server/typeorm'
import { TableUser } from '@/server/typeorm/database'
import { divineEventValidator } from '@/server/utils/utils-validator'
import { divineEventCatcher } from '@/server/utils/utils-handler'
import { divineIntNumber } from '@/server/utils/utils-common'
import { IsNotEmpty } from 'class-validator'

export class BodySchema extends TableUser {
    @IsNotEmpty({ message: 'Token 必填', groups: ['token'] })
    token: string
}

export default defineEventHandler(event => {
    return divineEventCatcher(event, async evt => {
        const body = await readBody<BodySchema>(event)
        await divineEventValidator(BodySchema, {
            data: body,
            option: { groups: ['nickname', 'email', 'password', 'code'] }
        })
        return { message: '登录成功' }
    })
})
