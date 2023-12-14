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
            <n-config-provider abstract inline-theme-disabled locale={zhCN} date-locale={dateZhCN} theme={darkTheme}>
                <n-layout
                    style={{ height: '100%', overflow: 'hidden', position: 'relative' }}
                    content-style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                >
                    <n-result style={{ margin: 'auto' }} size="huge" status={err.value.statusCode} title={err.value.message}>
                        {{
                            footer: () => (
                                <n-button strong secondary type="primary">
                                    <nuxt-link to="/document">Home</nuxt-link>
                                </n-button>
                            )
                        }}
                    </n-result>
                </n-layout>
            </n-config-provider>
        )
    }
})
</script>
