import { createBaser } from '@/server/typeorm'
import { TableUser } from '@/server/typeorm/entity'

export default defineEventHandler(async event => {
    const query = getQuery(event)
    console.log(query)
    return await createBaser(TableUser).then(async model => {
        return {
            query,
            code: 200,
            list: model.find()
        }
    })
})
