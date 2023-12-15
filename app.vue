<script lang="tsx">
import { zhCN, dateZhCN } from 'naive-ui'
import { defineComponent } from 'vue'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'App',
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
                <nuxt-layout>
                    <nuxt-page />
                </nuxt-layout>
            </n-config-provider>
        )
    }
})
</script>
