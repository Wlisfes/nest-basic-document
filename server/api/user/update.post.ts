import { createBaser } from '@/server/typeorm'
import { TableUser } from '@/server/typeorm/database'

export default defineEventHandler(async event => {
    return divineEventCatcher(event, async evt => {
        return { message: '修改成功' }
    })
})
