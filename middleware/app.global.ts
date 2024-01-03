import { useUser } from '@/store/user'
import { findSeoRoute } from '@/assets/resource/route'
import { divineHandler } from '@/utils/utils-common'
import { useStore } from '@/utils/utils-cookie'

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

    const { store, setRedirect, setUid, setToken } = useStore()
    if (process.client && store.value.uid) {
        const { user, logout, fetchUserResolver } = useUser()
        return await divineHandler(!user.value.uid, async () => {
            try {
                await fetchUserResolver()
                await setRedirect(undefined)
            } catch (err) {
                await setUid(undefined)
                await setToken(undefined)
                await setRedirect(to.fullPath)
                await logout()
            }
        })
    }
})
