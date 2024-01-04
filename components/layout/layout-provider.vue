<script lang="tsx">
import { zhCN, dateZhCN } from 'naive-ui'
import { useProvider } from '@/hooks/hook-provider'

export default defineNuxtComponent({
    name: 'LayoutProvider',
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
                            <n-message-provider>{{ default: slots.default }}</n-message-provider>
                        </n-notification-provider>
                    </n-dialog-provider>
                </n-loading-bar-provider>
            </n-config-provider>
        )
    }
})
</script>
