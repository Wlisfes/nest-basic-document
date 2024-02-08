import { createBuilder } from '@/server/lib/typeorm'
import { TableUserRoles } from '@/server/database'
import { ColumnSchema } from '@/server/interface/common.resolver'

/**列表参数**/
export class QuerySchema extends ColumnSchema {}

export default defineEventHandler(async event => {
    await divineEventJwtTokenValidator(event, { next: false })
    const state = await divineEventParameter({ page: 1, size: 10 }).then(json => {
        return Object.assign(json, getQuery<QuerySchema>(event))
    })
    await divineEventValidator(QuerySchema, {
        data: state,
        option: { groups: ['page', 'size'] }
    })
    return await createBuilder(event.context.db, TableUserRoles, async qb => {
        qb.skip((state.page - 1) * state.size)
        qb.take(state.size)
        return await qb.getManyAndCount()
    }).then(async ([list = [], total = 0, page = Number(state.page), size = Number(state.size)]) => {
        return { page, size, total, list }
    })
})
