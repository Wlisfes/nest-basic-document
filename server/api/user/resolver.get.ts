import { createBaser } from '@/server/typeorm'
import { TableUser } from '@/server/typeorm/entity'

export default defineEventHandler(async event => {
    const query = getQuery(event)
    return {
        query,
        code: 200
    }
})
