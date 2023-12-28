import { IsNumber, Min } from 'class-validator'
import { Type } from 'class-transformer'
import { createBuilder } from '@/server/typeorm'
import { TableUser } from '@/server/typeorm/database'
import { divineHandler } from '@/utils/utils-common'

export class QuerySchema {
    @IsOptional({ groups: ['size'] })
    @IsNumber({}, { message: 'page必须是数字', groups: ['size'] })
    @Min(1, { message: 'page必须大于0', groups: ['size'] })
    @Type(type => Number)
    page: number

    @IsOptional({ groups: ['size'] })
    @IsNumber({}, { message: 'size必须是数字', groups: ['size'] })
    @Min(1, { message: 'size必须大于0', groups: ['size'] })
    @Type(type => Number)
    size: number

    @IsOptional({ groups: ['keyword'] })
    keyword: string
}

export default defineEventHandler(async event => {
    return divineEventCatcher(event, async evt => {
        await divineEventJwtTokenValidator(event, { next: false })
        const state = await divineEventParameter({ page: 1, size: 10 }).then(json => {
            return Object.assign(json, getQuery<QuerySchema>(event))
        })
        console.log(state)
        await divineEventValidator(QuerySchema, {
            data: state,
            option: { groups: ['page', 'size'] }
        })
        return await createBuilder(event.context.db, TableUser, async qb => {
            await divineHandler(!!state.keyword, () => {
                qb.orWhere('t.uid LIKE :uid', { uid: `%${state.keyword}%` })
                qb.orWhere('t.nickname LIKE :nickname', { nickname: `%${state.keyword}%` })
                qb.orWhere('t.mobile LIKE :mobile', { mobile: `%${state.keyword}%` })
                return qb.orWhere('t.email LIKE :email', { email: `%${state.keyword}%` })
            })
            qb.skip((state.page - 1) * state.size)
            qb.take(state.size)
            return await qb.getManyAndCount()
        }).then(async ([list = [], total = 0]) => {
            return {
                total,
                list,
                page: state.page,
                size: state.size
            }
        })
    })
})
