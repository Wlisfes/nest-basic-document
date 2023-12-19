import { connection } from '@/server/typeorm'

export default defineEventHandler(async event => {
    event.context.db = await connection()
})
