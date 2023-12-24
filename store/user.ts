import { defineStore } from 'pinia'
import { httpUserResolver } from '@/api'

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
            try {
                const data = await httpUserResolver()
                this.uid = data.uid
            } catch (err) {}
        }
    }
})
