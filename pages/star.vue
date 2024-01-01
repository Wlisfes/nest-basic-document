<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Star',
    head: {
        titleTemplate: (title: string) => `${title} - 收藏 | 一个神奇的网站`
    },
    setup(props, { slots }) {
        return () => (
            <nuxt-layout name="client">
                <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">star</n-element>
            </nuxt-layout>
        )
    }
})
</script>
