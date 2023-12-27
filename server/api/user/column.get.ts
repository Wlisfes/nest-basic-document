import { IsNumber, Min } from 'class-validator'
import { Type } from 'class-transformer'
import { createBuilder } from '@/server/typeorm'
import { TableUser } from '@/server/typeorm/database'
import { IsOptional } from '@/server/utils/utils-decorator'
import { divineEventValidator, divineEventCatcher } from '@/server/utils/utils-validator'

export class QuerySchema extends TableUser {
    @IsOptional({ groups: ['size'] })
    @IsNumber({}, { message: 'page必须是数字', groups: ['size'] })
    @Min(1, { message: 'page必须大于0', groups: ['size'] })
    @Type(type => Number)
    page: number = 1

    @IsOptional({ groups: ['size'] })
    @IsNumber({}, { message: 'size必须是数字', groups: ['size'] })
    @Min(1, { message: 'size必须大于0', groups: ['size'] })
    @Type(type => Number)
    size: number = 10
}

export default defineEventHandler(async event => {
    return divineEventCatcher(event, async evt => {
        const query = getQuery<QuerySchema>(event)
        await divineEventValidator(QuerySchema, {
            data: query,
            option: { groups: ['page', 'size'] }
        })
        return await createBuilder(event.context.db, TableUser, async qb => {
            qb.skip((query.page - 1) * query.size)
            qb.take(query.size)
            return await qb.getManyAndCount()
        }).then(async ([list = [], total = 0]) => {
            return { total, list, page: query.page, size: query.size }
        })
    })
})
