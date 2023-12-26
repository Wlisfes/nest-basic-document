<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Video',
    setup(props, { slots }) {
        definePageMeta({ middleware: 'resolver' })

        return () => <div>video</div>
    }
})
</script>
