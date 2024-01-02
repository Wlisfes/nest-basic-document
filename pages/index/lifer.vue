<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Lifer',
    async setup(props, { slots }) {
        await createSeoMeta('生活记录')

        return () => <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">lifer</n-element>
    }
})
</script>
