<script lang="tsx">
import type { CSSProperties } from 'vue'
import { useResize } from '@/hooks/hook-client'
import { useProvider } from '@/hooks/hook-provider'

export default defineNuxtComponent({
    name: 'ClientLayout',
    setup(props, { slots }) {
        const { inverted } = useProvider()
        const { width } = useResize()
        const layout = computed<CSSProperties>(() => ({
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }))
        const Content = computed<CSSProperties>(() => ({
            ...layout.value,
            minHeight: '100%',
            zIndex: 2
        }))

        return () => (
            <n-layout class="layout-provider" content-style={layout.value}>
                <n-layout-header style={{ height: '60px', borderBottomColor: 'transparent' }} bordered inverted={inverted.value}>
                    <layout-header width={width.value} inverted={inverted.value}></layout-header>
                </n-layout-header>
                <n-layout-content
                    style={{ flex: 1 }}
                    content-style={Content.value}
                    native-scrollbar={false}
                    scrollbar-props={{ trigger: 'none' }}
                >
                    <n-element class="layout-pager n-chunk n-column n-auto">{{ default: slots.default }}</n-element>
                    <layout-footer></layout-footer>
                </n-layout-content>
                <common-ribbon></common-ribbon>
            </n-layout>
        )
    }
})
</script>
