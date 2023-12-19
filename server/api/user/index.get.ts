import { createBaser } from '@/server/typeorm'
import { TableUser } from '@/server/typeorm/entity'

export default defineEventHandler(async event => {
    return await createBaser(TableUser).then(async model => {
        return {
            code: 200,
            list: model.find()
        }
    })
})
