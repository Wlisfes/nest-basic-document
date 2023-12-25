<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useProvider } from '@/hooks/hook-provider'
import { useResize } from '@/hooks/hook-client'
import { useState } from '@/hooks/hook-state'
import { useUser } from '@/store/user'
import { divineWherer } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonHeader',
    setup() {
        const user = useUser()
        const { state, setState: done } = useState({ visible: false })
        const { inverted, setTheme } = useProvider()
        const { width } = useResize()

        async function setState() {
            return await done({ visible: !state.visible })
        }

        return () => (
            <n-layout-header class="common-header" style={{ height: '60px' }}>
                <n-element class="layout-pager n-chunk n-center">
                    <n-space size={20} wrap-item={false} align="center" justify="space-between" style={{ width: '100%' }}>
                        <nuxt-link to="/" style={{ textDecoration: 'none' }}>
                            <n-button text focusable={false}>
                                <common-wrapper size={40} name="Nuxt"></common-wrapper>
                                <n-h2 style={{ margin: 0, fontWeight: 600, padding: '8px 5px 0' }}>Wlisfes</n-h2>
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
                                style={{
                                    width: divineWherer(Boolean(user.uid), '240px', '140px'),
                                    padding: divineWherer(Boolean(user.uid), '15px', '8px')
                                }}
                                show={state.visible}
                                trigger="click"
                                placement="bottom"
                                onClickoutside={setState}
                                v-slots={{
                                    trigger: () => (
                                        <n-element class="n-pointer no-selecter" onClick={setState}>
                                            {user.uid ? (
                                                <n-space align="center" size={5} wrap-item={false}>
                                                    <n-avatar
                                                        round
                                                        size={28}
                                                        src="https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg"
                                                    />
                                                    <n-ellipsis tooltip={false} style={{ maxWidth: '80px' }}>
                                                        {user.nickname}
                                                    </n-ellipsis>
                                                </n-space>
                                            ) : (
                                                <n-button text focusable={false}>
                                                    <common-wrapper size={28} name="Avatar"></common-wrapper>
                                                </n-button>
                                            )}
                                        </n-element>
                                    ),
                                    default: () => (
                                        <n-element class="n-chunk n-column no-selecter">
                                            {user.uid ? (
                                                <Fragment>
                                                    <n-space align="center" size={10} wrap-item={false} style={{ marginBottom: '10px' }}>
                                                        <n-avatar
                                                            round
                                                            size={40}
                                                            src="https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg"
                                                        />
                                                        <div style={{ flex: 1, overflow: 'hidden' }}>
                                                            <n-h3 style={{ margin: 0, fontSize: '16px' }}>
                                                                <n-ellipsis tooltip={false}>{user.nickname}</n-ellipsis>
                                                            </n-h3>
                                                            <n-text>{`账号ID: ${user.uid}`}</n-text>
                                                        </div>
                                                    </n-space>
                                                    <n-button quaternary focusable={false} size="large">
                                                        <n-h4 style={{ margin: 0 }}>账号设置</n-h4>
                                                    </n-button>
                                                    <n-button quaternary focusable={false} size="large">
                                                        <n-h4 style={{ margin: 0 }}>退出登录</n-h4>
                                                    </n-button>
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <n-button quaternary focusable={false} size="large" onClick={setState}>
                                                        <nuxt-link
                                                            to="/common/authorize"
                                                            class="n-chunk n-center"
                                                            style={{ gap: '5px', textDecoration: 'none', color: 'var(--text-color-2)' }}
                                                        >
                                                            <common-wrapper size={24} name="Safety"></common-wrapper>
                                                            <n-h4 style={{ margin: 0, lineHeight: '20px' }}>登录</n-h4>
                                                        </nuxt-link>
                                                    </n-button>
                                                    <n-button quaternary focusable={false} size="large" onClick={setState}>
                                                        <nuxt-link
                                                            to="/common/register"
                                                            class="n-chunk n-center"
                                                            style={{ gap: '5px', textDecoration: 'none', color: 'var(--text-color-2)' }}
                                                        >
                                                            <common-wrapper size={22} name="Meta"></common-wrapper>
                                                            <n-h4 style={{ margin: 0, lineHeight: '20px' }}>注册</n-h4>
                                                        </nuxt-link>
                                                    </n-button>
                                                </Fragment>
                                            )}
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
