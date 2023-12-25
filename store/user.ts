import { defineStore } from 'pinia'
import { fetchUserResolver } from '@/api'

export const useUser = defineStore('user', {
    persist: process.client && { storage: localStorage },
    state: () => ({
        keyId: undefined,
        uid: undefined,
        nickname: undefined,
        email: undefined,
        avatar: undefined,
        mobile: undefined
    }),
    actions: {
        async httpUserResolver() {
            // try {
            //     const data = await fetchUserResolver()
            //     this.uid = data.uid
            // } catch (err) {}
        }
    }
})
