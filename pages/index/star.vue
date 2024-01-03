<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Star',
    setup(props, { slots }) {
        return () => <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">star</n-element>
    }
})
</script>
