import { useUser } from '@/store/user'
import { findSeoRoute } from '@/assets/resource/route'
import { divineHandler, divineWherer } from '@/utils/utils-common'
import { APP_NUXT, setStore, delStore } from '@/utils/utils-cookie'

async function createUseSeoMeta(evt: Partial<{ title: string; prefix: string }> = {}) {
    return useSeoMeta({
        title: evt.title,
        keywords: evt.prefix,
        description: `${evt.prefix} | 一个神奇的网站，包括归档、问题、视频、收藏、生活等模块，让我告诉你关于它的一切。`,
        //og
        ogTitle: evt.prefix,
        ogDescription: `${evt.prefix} | 一个神奇的网站，包括归档、问题、视频、收藏、生活等模块，让我告诉你关于它的一切。`,
        ogSiteName: evt.title,
        ogType: 'website',
        ogImage: '/logo.png',
        ogImageType: 'image/png',
        ogImageWidth: 1200,
        ogImageHeight: 630,
        //twitter
        twitterSite: evt.title,
        twitterCard: 'summary_large_image',
        twitterImage: '/logo.png',
        twitterImageWidth: 1200,
        twitterImageHeight: 1200
    })
}

export default defineNuxtRouteMiddleware(async (to, from) => {
    const config = useRuntimeConfig()
    const title = config.public.APP_NUXT_TITLE
    const node = await findSeoRoute(to.path)
    if (to.path === '/' || !node) {
        await createUseSeoMeta({
            title: `${title} - 一个神奇的网站`,
            prefix: title
        })
    } else if (node) {
        await createUseSeoMeta({
            title: `${title} - ${node.name}`,
            prefix: `${title} - ${node.name}`
        })
    }

    if (process.client && getToken()) {
        const store = useUser()
        return await divineHandler(!store.uid, async () => {
            try {
                await store.fetchUserResolver()
                await delStore(APP_NUXT.APP_NUXT_REDIRECT)
            } catch (err) {
                await delStore(APP_NUXT.APP_NUXT_TOKEN)
                await delStore(APP_NUXT.APP_NUXT_UID)
                await setStore(APP_NUXT.APP_NUXT_REDIRECT, to.fullPath)
                await store.logout()
            }
        })
    }
})
