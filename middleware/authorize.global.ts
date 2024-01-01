import { useUser } from '@/store/user'
import { divineHandler } from '@/utils/utils-common'
import { APP_NUXT, setStore } from '@/utils/utils-cookie'

/**黑名单页面：已登录不可进入**/
const APP_NUXT_BLACK: Record<string, string> = {
    AUTHORIZE: '/common/authorize',
    REGISTER: '/common/register'
}

/**授权页面：未登录不可进入**/
const APP_NUXT_AUTHORIZE: Record<string, string> = {}

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = getToken()
    const store = useUser()
    const AppNuxtBlack = Object.values(APP_NUXT_BLACK) as Array<string>
    const AppNuxtAuthorize = Object.values(APP_NUXT_AUTHORIZE) as Array<string>
    if (process.client && token) {
        /**存在token禁止进入黑名单页面**/
        if (AppNuxtBlack.includes(to.path)) {
            return await navigateTo('/')
        }
        /**拉取用户信息**/
        return await divineHandler(!store.uid, async () => {
            try {
                await store.fetchUserResolver()
            } catch (err) {
                await store.logout()
                await setStore(APP_NUXT.APP_NUXT_REDIRECT, to.fullPath)
                return await navigateTo('/')
            }
        })
    } else if (process.client) {
        /**不存在token禁止进入授权页面**/
        if (AppNuxtAuthorize.includes(to.path)) {
            return await navigateTo('/common/authorize')
        }
    }
})
