import { defineStore } from 'pinia'

export const useConfiger = defineStore('configer', {
    persist: true,
    state: () => ({
        theme: 'dark',
        primaryColor: '#18a058'
    }),
    actions: {
        async setTheme(theme: 'light' | 'dark') {
            return (this.theme = theme)
        },
        async setPrimaryColor(primaryColor: string) {
            return (this.primaryColor = primaryColor)
        }
    }
})
