import { defineStore } from 'pinia'
import { fetchUserResolver } from '@/interface'
import { delToken } from '@/utils/utils-cookie'

export const useUser = defineStore('user', {
    persist: false,
    state: () => ({
        keyId: undefined,
        uid: undefined,
        nickname: undefined,
        email: undefined,
        avatar: undefined,
        mobile: undefined
    }),
    actions: {
        /**更新用户信息**/
        async setUser(data: Record<string, any> = {}) {
            this.keyId = data.keyId ?? undefined
            this.uid = data.uid ?? undefined
            this.nickname = data.nickname ?? undefined
            this.email = data.email ?? undefined
            this.avatar = data.avatar ?? undefined
            this.mobile = data.mobile ?? undefined
            return data
        },
        /**退出登录**/
        async logout() {
            await delToken()
            return await this.setUser()
        },
        /**拉取用户信息**/
        async fetchUserResolver() {
            const { data } = await fetchUserResolver()
            return await this.setUser(data)
        }
    }
})
