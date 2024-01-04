import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
    const { $loadingBar } = useNuxtApp()
    nuxtApp.hook('app:beforeMount', () => {
        $loadingBar.start()
    })
    nuxtApp.hook('page:start', () => {
        $loadingBar.start()
    })
    nuxtApp.hook('page:finish', () => {
        $loadingBar.finish()
    })
    nuxtApp.hook('app:error', () => {
        $loadingBar.error()
    })
})
