<script lang="tsx">
import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
import { defineComponent, computed, type PropType } from 'vue'

export default defineComponent({
    name: 'Error',
    props: {
        error: { type: Object as PropType<Record<string, any>>, required: true }
    },
    setup(props) {
        const err = computed(() => ({
            statusCode: (props.error.statusCode ?? 500).toString(),
            message: props.error.message.toString()
        }))

        return () => (
            <section class="common-provider n-chunk n-center n-middle">
                <img src="/image/1702567045588.jpg" alt="404 Not Found" />
                <img src="~/assets/image/1702567045588.jpg" alt="404 Not Found" />
            </section>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-provider {
    &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -30%;
        height: 40%;
        background: linear-gradient(45deg, #00dc82 0%, #36e4da 50%, #0047e1 100%);
        filter: blur(20vh);
    }
    img {
        width: 640px;
        display: block;
    }
}
</style>
