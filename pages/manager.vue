<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BasicManager',
    setup(props, { slots }) {
        return () => (
            <nuxt-layout name="manager">
                <nuxt-page></nuxt-page>
            </nuxt-layout>
        )
    }
})
</script>
