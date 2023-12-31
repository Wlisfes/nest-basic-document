<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Star',
    head: {
        titleTemplate: (title: string) => `${title} - 收藏 | 一个神奇的网站`
    },
    setup(props, { slots }) {
        return () => <div>star</div>
    }
})
</script>
