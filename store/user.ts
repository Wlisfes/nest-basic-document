import { divineHandler } from '@/utils/utils-common'
import { APP_NUXT, setStore, delStore, delToken } from '@/utils/utils-cookie'
import * as http from '@/interface'

export function useUser() {
    const user = useState('user', () => ({
        keyId: undefined,
        uid: undefined,
        nickname: undefined,
        email: undefined,
        avatar: undefined,
        mobile: undefined
    }))

    /**更新用户信息**/
    async function setUser(data: Record<string, any> = {}) {
        await delStore(APP_NUXT.APP_NUXT_UID)
        user.value.keyId = data.keyId ?? undefined
        user.value.uid = data.uid ?? undefined
        user.value.nickname = data.nickname ?? undefined
        user.value.email = data.email ?? undefined
        user.value.avatar = data.avatar ?? undefined
        user.value.mobile = data.mobile ?? undefined
        return await divineHandler(data.uid, () => {
            return setStore(APP_NUXT.APP_NUXT_UID, data.uid)
        }).then(() => {
            return data
        })
    }

    /**退出登录**/
    async function logout() {
        await delToken()
        await delStore(APP_NUXT.APP_NUXT_UID)
        return await setUser()
    }

    /**拉取用户信息**/
    async function fetchUserResolver() {
        const { data } = await http.fetchUserResolver()
        return await setUser(data)
    }

    return { user, setUser, logout, fetchUserResolver }
}
