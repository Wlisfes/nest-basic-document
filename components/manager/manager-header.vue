<script lang="tsx">
export default defineNuxtComponent({
    name: 'ManagerHeader',
    props: {
        width: { type: Number },
        inverted: { type: Boolean }
    },
    setup(props) {
        const { $configer } = useNuxtApp()

        return () => (
            <n-element class="layout-pager n-chunk n-center" style={{ maxWidth: 'initial' }}>
                <n-space size={20} wrap-item={false} align="center" justify="space-between" style={{ width: '100%' }}>
                    <nuxt-link to="/" style={{ textDecoration: 'none' }}>
                        <n-button text focusable={false}>
                            <common-wrapper size={40} name="Nuxt"></common-wrapper>
                            <n-h2 style={{ margin: 0, fontWeight: 600, padding: '8px 5px 0' }}>Wlisfes</n-h2>
                        </n-button>
                    </nuxt-link>
                    <n-element>
                        <n-space size={16} wrap-item={false} align="center">
                            <n-space class="layout-header__cause" size={16} wrap-item={false} align="center">
                                <n-button
                                    text
                                    focusable={false}
                                    onClick={(e: Event) => $configer.setTheme(props.inverted ? 'light' : 'dark')}
                                >
                                    <common-wrapper size={28} name={props.inverted ? 'ThemeDark' : 'ThemeLight'}></common-wrapper>
                                </n-button>
                                <nuxt-link target="_blank" href="https://github.com/Wlisfes">
                                    <n-button text focusable={false}>
                                        <common-wrapper size={28} name="Github"></common-wrapper>
                                    </n-button>
                                </nuxt-link>
                            </n-space>
                            <manager-user></manager-user>
                        </n-space>
                    </n-element>
                </n-space>
            </n-element>
        )
    }
})
</script>
