import { useUser } from '@/store/user'
import { divineHandler } from '@/utils/utils-common'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = getToken()
    if (process.client && token) {
        const store = useUser()
        return await divineHandler(!store.uid, async () => {
            try {
                await store.fetchUserResolver()
            } catch (err) {
                return await navigateTo('/')
            }
        })
    }
})
