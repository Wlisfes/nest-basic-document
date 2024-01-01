<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Issues',
    head: {
        titleTemplate: (title: string) => `${title} - 常见问题 | 一个神奇的网站`
    },
    setup(props, { slots }) {
        return () => (
            <nuxt-layout name="client">
                <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">Issues</n-element>
            </nuxt-layout>
        )
    }
})
</script>
