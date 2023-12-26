<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Lifer',
    setup(props, { slots }) {
        definePageMeta({ middleware: 'resolver' })

        return () => <div>lifer</div>
    }
})
</script>
