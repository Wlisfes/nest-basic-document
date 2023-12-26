<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Document',
    setup(props, { slots }) {
        definePageMeta({ middleware: 'resolver' })

        return () => <div>Document</div>
    }
})
</script>
