<script lang="tsx">
export default defineNuxtComponent({
    name: 'LayoutHeader',
    props: {
        width: { type: Number },
        inverted: { type: Boolean }
    },
    setup(props) {
        const { $configer } = useNuxtApp()

        return () => (
            <n-element class="layout-header layout-pager n-chunk n-center">
                <n-space size={20} wrap-item={false} align="center" justify="space-between" style={{ width: '100%' }}>
                    <nuxt-link to="/" style={{ textDecoration: 'none' }}>
                        <n-button text focusable={false}>
                            <common-wrapper size={40} name="Nuxt"></common-wrapper>
                            <n-h2 style={{ margin: 0, fontWeight: 600, padding: '8px 5px 0' }}>Wlisfes</n-h2>
                        </n-button>
                    </nuxt-link>
                    {props.width >= 840 && (
                        <n-space class="layout-header__nav" size={30} wrap-item={false} align="center">
                            <nuxt-link to="/">
                                <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                    首页
                                </n-button>
                            </nuxt-link>
                            <nuxt-link to="/document">
                                <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                    归档
                                </n-button>
                            </nuxt-link>
                            <nuxt-link to="/issues">
                                <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                    问题
                                </n-button>
                            </nuxt-link>
                            <nuxt-link to="/video">
                                <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                    视频
                                </n-button>
                            </nuxt-link>
                            <nuxt-link to="/star">
                                <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                    收藏
                                </n-button>
                            </nuxt-link>
                            <nuxt-link to="/lifer">
                                <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                    生活
                                </n-button>
                            </nuxt-link>
                        </n-space>
                    )}
                    <n-element>
                        <n-space size={16} wrap-item={false} align="center">
                            {props.width >= 375 && (
                                <n-space size={16} wrap-item={false} align="center">
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
                            )}
                            <layout-user></layout-user>
                        </n-space>
                    </n-element>
                </n-space>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.layout-header {
    position: relative;
    &__nav {
        position: relative;
        a {
            position: relative;
            line-height: 28px;
            padding: 0 5px;
            &::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 0%;
                height: 2px;
                background-color: var(--primary-color-hover);
                transition: width 0.3s var(--n-bezier);
            }
            &:hover::after {
                width: 100%;
            }
            &.router-link-active.router-link-exact-active {
                &::after {
                    width: 100%;
                }
                .n-button {
                    color: var(--n-text-color-hover);
                }
            }
        }
    }
}
</style>
