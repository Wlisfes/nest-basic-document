<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Issues',
    head: {
        titleTemplate: (title: string) => `${title} - 常见问题 | 一个神奇的网站`
    },
    setup(props, { slots }) {
        return () => <div>Issues</div>
    }
})
</script>
