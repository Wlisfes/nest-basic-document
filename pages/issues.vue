<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Issues',
    async setup(props, { slots }) {
        await createSeoMeta('常见问题')
        return () => (
            <nuxt-layout name="client">
                <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">Issues</n-element>
            </nuxt-layout>
        )
    }
})
</script>
