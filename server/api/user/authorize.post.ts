import { createBaser } from '@/server/typeorm'
import { TableUser } from '@/server/typeorm/database'

export default defineEventHandler(async event => {
    const query = getQuery(event)
    return {
        query,
        code: 200
    }
})
