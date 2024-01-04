import { createDiscreteApi, type ConfigProviderProps } from 'naive-ui'
import { useProvider } from '@/hooks/hook-provider'

const configProviderRef = ref<ConfigProviderProps>({})
export default defineNuxtPlugin(nuxtApp => {
    const { $configer } = useNuxtApp()
    const { configProvider } = useProvider()
    const { message, notification, dialog, loadingBar } = createDiscreteApi(['message', 'dialog', 'notification', 'loadingBar'], {
        configProviderProps: configProviderRef as ConfigProviderProps
    })

    //prettier-ignore
    watch(() => $configer.configer.value.theme, () => {
        //@ts-ignore
        configProviderRef.value = configProvider.value
    },
    { immediate: true })

    return {
        provide: {
            message,
            notification,
            dialog,
            loadingBar
        }
    }
})
