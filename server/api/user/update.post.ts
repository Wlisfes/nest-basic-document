import { createBuilder } from '@/server/lib/typeorm'
import { TableUser } from '@/server/database'

export default defineEventHandler(async event => {
    return divineEventCatcher(event, async evt => {
        return { message: '修改成功' }
    })
})
