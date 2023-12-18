<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Index',
    setup(props, { slots }) {
        useHead({ title: '一个神奇的网站' })

        return () => <n-element class="layout-provider"></n-element>
    }
})
</script>
