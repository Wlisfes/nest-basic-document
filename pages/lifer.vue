<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Lifer',
    head: {
        titleTemplate: (title: string) => `${title} - 生活记录 | 一个神奇的网站`
    },
    setup(props, { slots }) {
        return () => (
            <nuxt-layout name="client">
                <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">lifer</n-element>
            </nuxt-layout>
        )
    }
})
</script>
