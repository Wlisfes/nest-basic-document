<script lang="tsx">
import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'App',
    setup(props, { slots }) {
        return () => (
            <n-config-provider abstract inline-theme-disabled locale={zhCN} date-locale={dateZhCN} theme={darkTheme}>
                <nuxt-layout>
                    <nuxt-page />
                </nuxt-layout>
            </n-config-provider>
        )
    }
})
</script>
