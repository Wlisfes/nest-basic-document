import { createConnection } from '@/server/typeorm'

export default defineEventHandler(async event => {
    event.context.db = await createConnection()
})
