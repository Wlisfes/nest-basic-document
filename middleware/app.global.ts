import { findSeoRoute } from '@/assets/resource/route'
import { divineHandler } from '@/utils/utils-common'
import { createSeoMeta } from '@/utils/utils-plugin'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const node = await findSeoRoute(to.path)
    await divineHandler(Boolean(node), () => {
        return createSeoMeta(node.name)
    })
})
