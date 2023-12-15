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
            <n-config-provider abstract inline-theme-disabled>
                <n-element class="layout-provider n-chunk n-column n-center n-middle">
                    <n-image preview-disabled src="/image/1702567045588.jpg" alt="404 Not Found" style={{ marginBottom: '40px' }} />
                    <n-button
                        size="large"
                        type="primary"
                        style={{ fontSize: '22px', height: '48px', padding: '0 24px' }}
                        onClick={async (evt: Event) => await navigateTo('/document')}
                    >
                        回到首页
                    </n-button>
                </n-element>
            </n-config-provider>
        )
    }
})
</script>

<style lang="scss" scoped>
.layout-provider {
    padding: 24px;
    box-sizing: border-box;
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
    .n-image,
    .n-image :deep(img) {
        width: 100%;
        max-width: 640px;
        display: block;
    }
}
</style>
