import { defineStore } from 'pinia'
import { fetchUserResolver } from '@/api'

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
        async fetchUserResolver() {
            const { data } = await fetchUserResolver()
            this.keyId = data.keyId
            this.uid = data.uid
            this.nickname = data.nickname
            this.email = data.email
            this.avatar = data.avatar
            this.mobile = data.mobile
            return data
        }
    }
})
