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
                    <common-wrapper size={414} name="404"></common-wrapper>
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
    box-sizing: border-box;
    padding-bottom: 10vh;
    &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -50%;
        height: 50%;
        background: linear-gradient(45deg, #00dc82 0%, #36e4da 50%, #0047e1 100%);
        filter: blur(20vh);
    }
}
</style>
