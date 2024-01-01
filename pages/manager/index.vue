<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Manager',
    head: {
        titleTemplate: (title: string) => `${title} - 常见问题 | 一个神奇的网站`
    },
    setup(props, { slots }) {
        return () => (
            <nuxt-layout name="manager">
                <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">video</n-element>
            </nuxt-layout>
        )
    }
})
</script>
