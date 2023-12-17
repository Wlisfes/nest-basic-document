<script lang="tsx">
import { defineComponent } from 'vue'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'CommonHeader',
    setup() {
        const { inverted, setTheme } = useProvider()

        return () => (
            <n-layout-header class="common-header" style={{ height: '60px' }}>
                <n-element class="layout-pager n-chunk n-center">
                    <n-space size={20} wrap-item={false} align="center" justify="space-between" style={{ width: '100%' }}>
                        <n-button text focusable={false}>
                            <common-wrapper size={40} name="Nuxt"></common-wrapper>
                            <n-h2 style={{ margin: 0, fontWeight: 600, padding: '8px 5px 0' }}>Document</n-h2>
                        </n-button>
                        <n-space size={16} wrap-item={false} align="center">
                            <n-button text focusable={false} onClick={(e: Event) => setTheme(inverted.value ? 'light' : 'dark')}>
                                <common-wrapper size={28} name={inverted.value ? 'ThemeDark' : 'ThemeLight'}></common-wrapper>
                            </n-button>
                            <n-a type="default" target="_blank" href="https://github.com/Wlisfes/nest-basic-document">
                                <n-button text focusable={false}>
                                    <common-wrapper size={28} name="Github"></common-wrapper>
                                </n-button>
                            </n-a>
                        </n-space>
                    </n-space>
                </n-element>
            </n-layout-header>
        )
    }
})
</script>
