import { createBaser, createInserter } from '@/server/typeorm'
import { TableUser } from '@/server/typeorm/database'
import { divineEventValidator, divineEventCatcher, divineEventJwtTokenValidator } from '@/server/utils/utils-validator'

export default defineEventHandler(event => {
    return divineEventCatcher(event, async evt => {
        const token = getRequestHeader(event, 'authorization')
        await divineEventJwtTokenValidator(event, { next: false })

        return { token, code: 200 }
    })
})
