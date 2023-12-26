import { useUser } from '@/store/user'
import { divineHandler } from '@/utils/utils-common'
import * as http from '@/api'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = getToken()
    if (process.client && !token) {
        return await navigateTo(`/common/authorize`)
    } else if (process.client) {
        const store = useUser()
        return await divineHandler(!store.uid, async () => {
            try {
                await http.fetchUserResolver()
            } catch (err) {
                return await navigateTo('/')
            }
        })
    }
})
