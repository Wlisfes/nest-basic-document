import { useUser } from '@/store/user'
import { divineHandler } from '@/utils/utils-common'
import { APP_NUXT, setStore } from '@/utils/utils-cookie'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = getToken()
    if (process.client && token) {
        const store = useUser()
        return await divineHandler(!store.uid, async () => {
            try {
                await store.fetchUserResolver()
            } catch (err) {
                await setStore(APP_NUXT.APP_NUXT_REDIRECT, to.fullPath)
                return await navigateTo('/')
            }
        })
    }
})
