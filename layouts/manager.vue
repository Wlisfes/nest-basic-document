<script lang="tsx">
import { defineComponent, computed, type CSSProperties } from 'vue'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'ManagerLayout',
    setup(props, { slots }) {
        const { $configer } = useNuxtApp()
        const { inverted } = useProvider()
        const layout = computed<CSSProperties>(() => ({
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }))
        const content = computed<CSSProperties>(() => ({
            ...layout.value,
            minHeight: '100%'
        }))

        return () => (
            <client-only>
                <n-layout class="layout-provider" has-sider content-style={layout.value}>
                    <n-layout-sider
                        collapsed={$configer.configer.value.collapse}
                        inverted={inverted.value}
                        width={240}
                        collapsed-width={$configer.configer.value.device === 'MOBILE' ? 0 : 64}
                        native-scrollbar={false}
                        bordered
                        show-trigger={$configer.configer.value.device === 'MOBILE' ? false : 'bar'}
                        collapse-mode="width"
                        expanded-keys={[]}
                        onUpdateCollapsed={() => $configer.setCollapse(!$configer.configer.value.collapse)}
                    ></n-layout-sider>
                    <n-layout class="layout-provider" style={{ flex: 1 }} content-style={layout.value}>
                        <n-layout-header style={{ height: '60px' }} bordered inverted={inverted.value}></n-layout-header>
                        <n-layout-content
                            style={{ flex: 1 }}
                            content-style={content.value}
                            native-scrollbar={false}
                            scrollbar-props={{ trigger: 'none' }}
                        >
                            {{ default: slots.default }}
                        </n-layout-content>
                    </n-layout>
                </n-layout>
            </client-only>
        )
    }
})
</script>
