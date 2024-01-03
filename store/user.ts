import { useStore } from '@/utils/utils-cookie'
import * as http from '@/interface'

export function useUser() {
    const { setUid, setToken } = useStore()
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
        user.value.keyId = data.keyId ?? undefined
        user.value.uid = data.uid ?? undefined
        user.value.nickname = data.nickname ?? undefined
        user.value.email = data.email ?? undefined
        user.value.avatar = data.avatar ?? undefined
        user.value.mobile = data.mobile ?? undefined
        return await setUid(data.uid ?? undefined).then(() => {
            return data
        })
    }

    /**退出登录**/
    async function logout() {
        await setToken()
        await setUid()
        return await setUser()
    }

    /**拉取用户信息**/
    async function fetchUserResolver() {
        const { data } = await http.fetchUserResolver()
        return await setUser(data)
    }

    return { user, setUser, logout, fetchUserResolver }
}
