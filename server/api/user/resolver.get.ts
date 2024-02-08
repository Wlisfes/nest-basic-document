import { createBuilder } from '@/server/lib/typeorm'
import { TableUser } from '@/server/database'

export default defineEventHandler(async event => {
    const { uid } = await divineEventJwtTokenValidator(event, { next: false })
    return await createBuilder(event.context.db, TableUser, async qb => {
        qb.orWhere('t.uid = :uid', { uid })
        qb.andWhere('t.status IN(:...status)', { status: ['enable', 'disable'] })
        return await qb.getOne()
    }).then(async data => {
        await divineEventWhereCatcher(data.status === 'disable', {
            message: '账户已被禁用'
        })
        return data
    })
})
