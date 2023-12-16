<script lang="tsx">
import { defineComponent, computed, type CSSProperties } from 'vue'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'BaseLayout',
    setup(props, { slots }) {
        const { inverted, setTheme } = useProvider()
        const contentStyle = computed<CSSProperties>(() => ({
            overflow: 'hidden',
            position: 'relative',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column'
        }))

        return () => (
            <client-only>
                <n-layout class="layout-provider" content-style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <n-layout-header style={{ height: '60px', padding: '0 16px' }}>
                        <n-button text focusable={false} onClick={(e: Event) => setTheme(inverted.value ? 'light' : 'dark')}>
                            <common-wrapper size={24} name={inverted.value ? 'ThemeDark' : 'ThemeLight'}></common-wrapper>
                        </n-button>
                    </n-layout-header>
                    <n-layout-content content-style={contentStyle.value} native-scrollbar={false} scrollbar-props={{ trigger: 'none' }}>
                        <n-element class="layout-content n-chunk n-column n-auto">{slots.default?.()}</n-element>
                        <common-footer></common-footer>
                    </n-layout-content>
                </n-layout>
            </client-only>
        )
    }
})
</script>
