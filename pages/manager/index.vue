<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Home',
    head: {
        titleTemplate: (title: string) => `${title} - 常见问题 | 一个神奇的网站`
    },
    setup(props, { slots }) {
        return () => <n-element class="layout-provider n-chunk n-column n-center n-auto no-selecter">Home</n-element>
    }
})
</script>
