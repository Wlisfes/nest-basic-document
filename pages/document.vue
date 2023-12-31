<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Document',
    head: {
        titleTemplate: (title: string) => `${title} - 文档 | 一个神奇的网站`
    },
    setup(props, { slots }) {
        return () => <div>Document</div>
    }
})
</script>
