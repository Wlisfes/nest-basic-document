<script lang="tsx">
import { Fragment } from 'vue'
import { zhCN, dateZhCN, useNotification, useLoadingBar, useDialog, useMessage } from 'naive-ui'
import { useProvider } from '@/hooks/hook-provider'

const LayoutMounter = defineNuxtComponent({
    name: 'LayoutMounter',
    setup(props, { slots }) {
        if (process.client) {
            window.$loadingBar = useLoadingBar()
            window.$message = useMessage()
            window.$notification = useNotification()
            window.$dialog = useDialog()
        }
        return () => <Fragment>{slots.default()}</Fragment>
    }
})

export default defineNuxtComponent({
    name: 'LayoutProvider',
    components: { LayoutMounter },
    setup(props, { slots }) {
        const { theme, themeOverrides } = useProvider()

        return () => (
            <n-config-provider
                abstract
                inline-theme-disabled
                locale={zhCN}
                date-locale={dateZhCN}
                theme={theme.value}
                theme-overrides={themeOverrides.value}
            >
                <n-loading-bar-provider>
                    <n-dialog-provider>
                        <n-notification-provider max={3}>
                            <n-message-provider>
                                <layout-mounter>{{ default: slots.default }}</layout-mounter>
                            </n-message-provider>
                        </n-notification-provider>
                    </n-dialog-provider>
                </n-loading-bar-provider>
            </n-config-provider>
        )
    }
})
</script>
