import { createBuilder } from '@/server/lib/typeorm'
import { TableUser } from '@/server/database'
import { divineWhereCatcher, divineJwtTokenValidator } from '@/server/utils/utils-validator'

export default defineEventHandler(async event => {
    const { uid } = await divineJwtTokenValidator(event, { next: false })
    return await createBuilder(event.context.db, TableUser, async qb => {
        qb.orWhere('t.uid = :uid', { uid })
        qb.andWhere('t.status IN(:...status)', { status: ['enable', 'disable'] })
        return await qb.getOne()
    }).then(async data => {
        await divineWhereCatcher(data.status === 'disable', {
            message: '账户已被禁用'
        })
        return data
    })
})
