import { defineNuxtPlugin } from '#app'
import type { LoadingBarApi } from 'naive-ui'

export default defineNuxtPlugin(nuxtApp => {
    const loadingBar = nuxtApp.$loadingBar as LoadingBarApi
    nuxtApp.hook('app:beforeMount', () => {
        loadingBar.start()
    })
    nuxtApp.hook('page:start', () => {
        loadingBar.start()
    })
    nuxtApp.hook('page:finish', () => {
        loadingBar.finish()
    })
    nuxtApp.hook('app:error', () => {
        loadingBar.error()
    })
})
