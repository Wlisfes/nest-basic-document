import { createBuilder } from '@/server/typeorm'
import { TableUser } from '@/server/typeorm/database'

export default defineEventHandler(event => {
    return divineEventCatcher(event, async evt => {
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
})
