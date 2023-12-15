import { defineStore } from 'pinia'

export const useConfiger = defineStore('configer', {
    state: () => ({
        theme: 'light'
    }),
    actions: {}
})
