<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Document',
    async setup(props, { slots }) {
        await createSeoMeta('文档')
        return () => (
            <nuxt-layout name="client">
                <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">Document</n-element>
            </nuxt-layout>
        )
    }
})
</script>
