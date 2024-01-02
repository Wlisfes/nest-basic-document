<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Video',
    async setup(props, { slots }) {
        await createSeoMeta('视频')
        return () => (
            <nuxt-layout name="client">
                <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">video</n-element>
            </nuxt-layout>
        )
    }
})
</script>
