<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Document',
    setup(props, { slots }) {
        return () => <div>Document</div>
    }
})
</script>
