import { createBuilder } from '@/server/lib/typeorm'
import { TableUser } from '@/server/database'
import { divineHandler } from '@/utils/utils-common'
import { IsOptional } from '@/server/utils/utils-decorator'
import { ColumnSchema } from '@/server/interface/common.resolver'

/**列表参数**/
export class QuerySchema extends ColumnSchema {
    @IsOptional({ groups: ['keyword'] })
    keyword: string
}

export default defineEventHandler(async event => {
    await divineEventJwtTokenValidator(event, { next: false })
    const state = await divineEventParameter({ page: 1, size: 10 }).then(json => {
        return Object.assign(json, getQuery<QuerySchema>(event))
    })
    await divineEventValidator(QuerySchema, {
        data: state,
        option: { groups: ['page', 'size'] }
    })
    return await createBuilder(event.context.db, TableUser, async qb => {
        qb.leftJoinAndSelect('t.roles', 'roles')
        await divineHandler(!!state.keyword, () => {
            qb.orWhere('t.uid LIKE :uid', { uid: `%${state.keyword}%` })
            qb.orWhere('t.nickname LIKE :nickname', { nickname: `%${state.keyword}%` })
            qb.orWhere('t.mobile LIKE :mobile', { mobile: `%${state.keyword}%` })
            return qb.orWhere('t.email LIKE :email', { email: `%${state.keyword}%` })
        })
        qb.skip((state.page - 1) * state.size)
        qb.take(state.size)
        return await qb.getManyAndCount()
    }).then(([list = [], total = 0, page = Number(state.page), size = Number(state.size)]) => {
        return { page, size, total, list }
    })
})
