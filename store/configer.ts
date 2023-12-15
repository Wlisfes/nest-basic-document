import { defineStore } from 'pinia'

export const useConfiger = defineStore('configer', {
    state: () => ({
        theme: 'light',
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
