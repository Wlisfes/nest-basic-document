<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Index',
    setup(props, { slots }) {
        return () => (
            <div>
                <nuxt-welcome />
            </div>
        )
    }
})
</script>
