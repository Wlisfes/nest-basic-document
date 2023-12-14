<script lang="tsx">
import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'App',
    setup(props, { slots }) {
        useSeoMeta({
            title: '我的神奇网站',
            ogTitle: '我的神奇网站',
            description: '这是我的神奇网站，让我告诉你关于它的一切。',
            ogDescription: '这是我的神奇网站，让我告诉你关于它的一切。'
        })

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
