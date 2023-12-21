<script lang="tsx">
import { defineComponent } from 'vue'
import { useProvider } from '@/hooks/hook-provider'
import { useResize } from '@/hooks/hook-client'

export default defineComponent({
    name: 'CommonHeader',
    setup() {
        const { inverted, setTheme } = useProvider()
        const { width } = useResize()

        return () => (
            <n-layout-header class="common-header" style={{ height: '60px' }}>
                <n-element class="layout-pager n-chunk n-center">
                    <n-space size={20} wrap-item={false} align="center" justify="space-between" style={{ width: '100%' }}>
                        <nuxt-link to="/">
                            <n-button text focusable={false}>
                                <common-wrapper size={40} name="Nuxt"></common-wrapper>
                                <n-h2 style={{ margin: 0, fontWeight: 600, padding: '8px 5px 0' }}>Wen</n-h2>
                            </n-button>
                        </nuxt-link>
                        {width.value >= 840 && (
                            <n-space class="common-header__nav" size={20} wrap-item={false} align="center">
                                <nuxt-link to="/">
                                    <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                        Home
                                    </n-button>
                                </nuxt-link>
                                <nuxt-link to="/document">
                                    <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                        Document
                                    </n-button>
                                </nuxt-link>
                                <nuxt-link to="/issues">
                                    <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                        Issues
                                    </n-button>
                                </nuxt-link>
                                <nuxt-link to="/video">
                                    <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                        Video
                                    </n-button>
                                </nuxt-link>
                                <nuxt-link to="/star">
                                    <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                        Star
                                    </n-button>
                                </nuxt-link>
                                <nuxt-link to="/lifer">
                                    <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                        Lifer
                                    </n-button>
                                </nuxt-link>
                            </n-space>
                        )}
                        <n-space size={16} wrap-item={false} align="center">
                            {width.value >= 375 && (
                                <n-space class="common-header__cause" size={16} wrap-item={false} align="center">
                                    <n-button text focusable={false} onClick={(e: Event) => setTheme(inverted.value ? 'light' : 'dark')}>
                                        <common-wrapper size={28} name={inverted.value ? 'ThemeDark' : 'ThemeLight'}></common-wrapper>
                                    </n-button>
                                    <nuxt-link target="_blank" href="https://github.com/Wlisfes/nest-basic-document">
                                        <n-button text focusable={false}>
                                            <common-wrapper size={28} name="Github"></common-wrapper>
                                        </n-button>
                                    </nuxt-link>
                                </n-space>
                            )}
                            <n-popover
                                trigger="click"
                                placement="bottom-end"
                                style={{ width: '200px', padding: '15px 15px' }}
                                v-slots={{
                                    trigger: () => (
                                        <n-space class="n-pointer no-selecter" align="center" size={5} wrap-item={false}>
                                            <n-avatar round size={34} src="https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg" />
                                            <n-ellipsis tooltip={false} style={{ maxWidth: '80px' }}>
                                                妖雨纯
                                            </n-ellipsis>
                                        </n-space>
                                    ),
                                    default: () => (
                                        <n-element class="n-chunk n-column no-selecter">
                                            <div style={{ paddingBottom: '10px' }}>
                                                <n-h3 style={{ margin: 0 }}>
                                                    <n-ellipsis tooltip={false}>妖雨纯</n-ellipsis>
                                                </n-h3>
                                                <n-text>账号ID: 1703172025710</n-text>
                                            </div>
                                            <n-button quaternary focusable={false} size="large">
                                                <n-h4 style={{ margin: 0 }}>账号设置</n-h4>
                                            </n-button>
                                            <n-button quaternary focusable={false} size="large">
                                                <n-h4 style={{ margin: 0 }}>退出登录</n-h4>
                                            </n-button>
                                        </n-element>
                                    )
                                }}
                            ></n-popover>
                        </n-space>
                    </n-space>
                </n-element>
            </n-layout-header>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-header {
    position: relative;
    &__nav {
        position: relative;
        a {
            position: relative;
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
