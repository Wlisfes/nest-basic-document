<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Video',
    head: {
        titleTemplate: (title: string) => `${title} - 视频 | 一个神奇的网站`
    },
    setup(props, { slots }) {
        return () => (
            <nuxt-layout name="client">
                <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">video</n-element>
            </nuxt-layout>
        )
    }
})
</script>
