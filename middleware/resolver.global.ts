import { useUser } from '@/store/user'
import { divineHandler } from '@/utils/utils-common'
import { APP_NUXT, setStore, delStore } from '@/utils/utils-cookie'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = getToken()
    const store = useUser()
    if (process.client && token) {
        return await divineHandler(!store.uid, async () => {
            try {
                await store.fetchUserResolver()
                await delStore(APP_NUXT.APP_NUXT_REDIRECT)
            } catch (err) {
                await delStore(APP_NUXT.APP_NUXT_REDIRECT)
                await setStore(APP_NUXT.APP_NUXT_REDIRECT, to.fullPath)
            }
        })
    }
})
