import { createDiscreteApi } from 'naive-ui'
import { useStore } from '@/utils/utils-cookie'
import { useConfiger } from '@/store/configer'
import { useUser } from '@/store/user'
import { useProvider } from '@/hooks/hook-provider'

export default defineNuxtPlugin(nuxtApp => {
    const store = useStore()
    const configer = useConfiger()
    const user = useUser()
    const { theme } = useProvider()
    const { message, notification, dialog, loadingBar } = createDiscreteApi(['message', 'dialog', 'notification', 'loadingBar'], {
        configProviderProps: { theme: theme.value }
    })
    return {
        provide: {
            store,
            configer,
            user,
            message,
            notification,
            dialog,
            loadingBar
        }
    }
})
