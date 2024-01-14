<script lang="tsx">
import type { CSSProperties } from 'vue'
import { useProvider } from '@/hooks/hook-provider'
import { useResize } from '@/hooks/hook-client'

export default defineNuxtComponent({
    name: 'ManagerLayout',
    setup(props, { slots }) {
        const { $configer } = useNuxtApp()
        const { inverted } = useProvider()
        const { mobile, width } = useResize()
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
            <n-layout class="layout-provider" content-style={layout.value}>
                <n-layout-header style={{ height: '60px' }} bordered inverted={inverted.value}>
                    <manager-header width={width.value} inverted={inverted.value}></manager-header>
                </n-layout-header>
                <n-layout class="layout-provider" has-sider style={{ flex: 1 }} content-style={layout.value}>
                    <n-layout-sider
                        bordered
                        width={260}
                        native-scrollbar={false}
                        collapsed-width={mobile.value ? 0 : 80}
                        inverted={inverted.value}
                        show-trigger={mobile.value ? false : 'bar'}
                        collapsed={$configer.configer.value.collapse}
                        collapse-mode="width"
                        expanded-keys={[]}
                        onUpdateCollapsed={() => $configer.setCollapse(!$configer.configer.value.collapse)}
                    >
                        <manager-sider inverted={inverted.value} collapse={$configer.configer.value.collapse}></manager-sider>
                    </n-layout-sider>
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
        )
    }
})
</script>
