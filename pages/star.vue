<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Star',
    async setup(props, { slots }) {
        await createSeoMeta('收藏')
        return () => (
            <nuxt-layout name="client">
                <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">star</n-element>
            </nuxt-layout>
        )
    }
})
</script>
