import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.hook('app:mounted', () => {})
    nuxtApp.hook('page:start', () => {
        if (process.client && window.$loadingBar) {
            window.$loadingBar.start()
        }
    })
    nuxtApp.hook('page:finish', () => {
        if (process.client && window.$loadingBar) {
            window.$loadingBar.finish()
        }
    })
    nuxtApp.hook('app:error', () => {
        if (process.client && window.$loadingBar) {
            window.$loadingBar.error()
        }
    })
})
