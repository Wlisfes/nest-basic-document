<script lang="tsx">
import { defineComponent } from 'vue'
import { useProvider } from '@/hooks/hook-provider'

export default defineComponent({
    name: 'CommonHeader',
    setup() {
        const { inverted, setTheme } = useProvider()

        return () => (
            <n-layout-header class="common-header">
                <n-element class="common-header__container n-chunk n-center">
                    <n-space size={24} wrap-item={false} align="center" style={{ width: '100%' }}>
                        <n-button text focusable={false}>
                            <common-wrapper size={48} name="Nuxt"></common-wrapper>

                            <n-h1 style={{ margin: 0, fontSize: '26px', fontWeight: 600, padding: '12px 10px 0' }}>Document</n-h1>
                        </n-button>
                        <n-button text focusable={false} onClick={(e: Event) => setTheme(inverted.value ? 'light' : 'dark')}>
                            <common-wrapper size={24} name={inverted.value ? 'ThemeDark' : 'ThemeLight'}></common-wrapper>
                        </n-button>
                    </n-space>
                </n-element>
            </n-layout-header>
        )
    }
})
</script>

<style scoped lang="scss">
.common-header {
    height: 60px;
    &__container {
        width: 100%;
        height: 100%;
        max-width: 1280px;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 0 16px;
    }
}
</style>
