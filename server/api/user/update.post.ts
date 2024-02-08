import { createBuilder } from '@/server/lib/typeorm'
import { TableUser } from '@/server/database'

export default defineEventHandler(async event => {
    return { message: '修改成功' }
})
