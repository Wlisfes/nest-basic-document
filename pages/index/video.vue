<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Video',
    setup(props, { slots }) {
        return () => <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">video</n-element>
    }
})
</script>
