<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Star',
    setup(props, { slots }) {
        definePageMeta({ middleware: 'resolver' })

        return () => <div>star</div>
    }
})
</script>
