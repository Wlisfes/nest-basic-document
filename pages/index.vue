<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Index',
    setup(props, { slots }) {
        return () => (
            <div>
                {Array.from({ length: 50 }, (x, i) => (
                    <n-h2>{i}</n-h2>
                ))}
            </div>
        )
    }
})
</script>
