import { useUser } from '@/store/user'
import { findSeoRoute } from '@/assets/resource/route'
import { divineHandler, divineWherer } from '@/utils/utils-common'
import { APP_NUXT, setStore, delStore } from '@/utils/utils-cookie'

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
        async () => {
            return await createUseSeoMeta(node.name)
        },
        async () => {
            return await createUseSeoMeta('')
        }
    )

    const token = getToken()
    if (process.client && token) {
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
