import { findSeoRoute } from '@/assets/resource/route'
import { divineHandler, divineWherer } from '@/utils/utils-common'

async function createUseSeoMeta(title: string) {
    const name = 'Wlisfes'
    const prefix = divineWherer(Boolean(title), `${name} - ${title}`, title)
    return useSeoMeta({
        title: prefix,
        keywords: prefix,
        description: `${prefix} | 一个神奇的网站，让我告诉你关于它的一切。`,
        //og
        ogTitle: prefix,
        ogDescription: `${prefix} | 一个神奇的网站，让我告诉你关于它的一切。`,
        ogSiteName: name,
        ogType: 'website',
        ogImage: '/logo.png',
        ogImageType: 'image/png',
        ogImageWidth: 1200,
        ogImageHeight: 630,
        //twitter
        twitterSite: name,
        twitterCard: 'summary_large_image',
        twitterImage: '/logo.png',
        twitterImageWidth: 1200,
        twitterImageHeight: 1200
    })
}

export default defineNuxtRouteMiddleware(async (to, from) => {
    const node = await findSeoRoute(to.path)
    await divineHandler(
        Boolean(node),
        async () => await createUseSeoMeta(node.name),
        async () => await createUseSeoMeta('')
    )
})
