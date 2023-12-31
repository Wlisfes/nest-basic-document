<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Video',
    head: {
        titleTemplate: (title: string) => `${title} - 视频 | 一个神奇的网站`
    },
    setup(props, { slots }) {
        return () => <div>video</div>
    }
})
</script>
