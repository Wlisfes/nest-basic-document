import { createBaser } from '@/server/typeorm'
import { TableUser } from '@/server/typeorm/database'

export default defineEventHandler(async event => {
    const query = getQuery(event)
    console.log(query)
    return await createBaser(event.context.db, TableUser).then(async model => {
        return {
            query,
            code: 200,
            list: model.find()
        }
    })
})
