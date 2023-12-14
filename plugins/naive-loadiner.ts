import { defineNuxtPlugin } from '#app'
import { computed, ref } from 'vue'
import { createDiscreteApi, darkTheme, lightTheme, type ConfigProviderProps } from 'naive-ui'

export default defineNuxtPlugin(nuxtApp => {
    const loadiner = ref()
    const themeRef = ref<'light' | 'dark'>('light')
    const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
        theme: themeRef.value === 'light' ? lightTheme : darkTheme
    }))
    nuxtApp.hook('app:mounted', () => {
        if (!loadiner.value) {
            const { loadingBar } = createDiscreteApi(['loadingBar'], {
                configProviderProps: configProviderPropsRef
            })
            loadiner.value = loadingBar
        }
    })
    nuxtApp.hook('page:start', () => {
        loadiner.value.start()
    })
    nuxtApp.hook('page:finish', () => {
        loadiner.value.finish()
    })
    nuxtApp.hook('app:error', () => {
        loadiner.value.error()
    })
})
