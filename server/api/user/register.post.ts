import { createBaser } from '@/server/typeorm'
import { TableUser } from '@/server/typeorm/database'
import { divineEventValidator } from '@/server/utils/utils-validator'
import { divineEventCatcher } from '@/server/utils/utils-handler'

export default defineEventHandler(event => {
    return divineEventCatcher(event, async evt => {
        const body = await readBody(event)
        await divineEventValidator(TableUser, {
            data: body,
            option: {
                groups: ['mobile', 'password']
            }
        })
        return await createBaser(event.context.db, TableUser).then(async model => {
            return {
                list: model.find()
            }
        })
    })
})
