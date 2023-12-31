<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Lifer',
    head: {
        titleTemplate: (title: string) => `${title} - 生活记录 | 一个神奇的网站`
    },
    setup(props, { slots }) {
        return () => <div>lifer</div>
    }
})
</script>
