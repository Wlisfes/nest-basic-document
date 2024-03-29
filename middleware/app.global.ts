import { findSeoRoute } from '@/assets/resource/route'
import { divineHandler } from '@/utils/utils-common'

//已登录禁止进入
export const black: Array<{ name: string; path: string }> = [
    { name: '登录', path: '/common/login' },
    { name: '注册', path: '/common/register' }
]

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

    const { $store, $user } = useNuxtApp()
    if (process.client && $store.store.value.token) {
        /**加载用户信息**/
        await divineHandler(!$user.user.value.uid, async () => {
            try {
                await $user.fetchUserResolver()
                await $store.setRedirect(undefined)
            } catch (err) {
                await $store.setUid(undefined)
                await $store.setToken(undefined)
                await $store.setRedirect(to.fullPath)
                await $user.logout()
                return await navigateTo({ path: '/' })
            }
        })
        if (black.some(item => item.path === to.path)) {
            return await navigateTo({ path: '/', params: to.params, query: to.query, replace: true })
        }
    } else if (process.client && to.path.includes('/manager')) {
        return await navigateTo({ path: '/', params: to.params, query: to.query, replace: true })
    }
})
