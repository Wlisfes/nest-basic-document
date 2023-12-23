import { createBaser } from '@/server/typeorm'
import { TableUser } from '@/server/typeorm/entity'
import { divineEventValidator } from '@/server/utils/utils-validator'

export default defineEventHandler(async event => {
    const body = await readBody(event)
    await divineEventValidator(TableUser, {
        data: body,
        option: {
            groups: ['mobile', 'password']
        }
    })

    return await createBaser(event.context.db, TableUser).then(async model => {
        return {
            code: 200,
            list: model.find()
        }
    })
})
