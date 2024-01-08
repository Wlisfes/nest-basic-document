<script lang="tsx">
import { stop, divineDelay } from '@/utils/utils-common'
import { createDiscover } from '@/utils/utils-naive'

export default defineNuxtComponent({
    name: 'ManagerUser',
    setup() {
        const state = reactive({ visible: false })
        const { $user } = useNuxtApp()

        async function done() {
            return (state.visible = !state.visible)
        }

        function stopHandler(evt: Event) {
            return stop(evt, () => {
                if (!state.visible) {
                    state.visible = true
                }
            })
        }

        async function closure() {
            await done()
            return await createDiscover({
                type: 'warning',
                title: '提示',
                negativeText: '取消',
                positiveText: '确定',
                content: () => <n-h3>确定要退出登录吗？</n-h3>,
                positiveButtonProps: { type: 'error' },
                onAfterEnter: (e: HTMLElement) => transfer(e),
                onPositiveClick: async (evt, vm, done: Function) => {
                    await done(true)
                    await divineDelay(500)
                    await navigateTo({ path: '/' })
                    return await $user.logout().then(() => {
                        return true
                    })
                }
            })
        }

        return () => (
            <n-popover
                show={state.visible}
                trigger="click"
                placement="bottom"
                style={{ width: '240x', padding: '15px' }}
                onClickoutside={done}
            >
                {{
                    trigger: () => (
                        <n-element class="n-pointer no-selecter" onClick={stopHandler}>
                            {$user.user.value.uid ? (
                                <n-space align="center" size={5} wrap-item={false}>
                                    <n-avatar round size={28} src="https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg" />
                                    <n-ellipsis tooltip={false} style={{ maxWidth: '80px' }}>
                                        {$user.user.value.nickname}
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
                            <n-space align="center" size={10} wrap-item={false} style={{ marginBottom: '10px' }}>
                                <n-avatar round size={40} src="https://oss.lisfes.cn/cloud/avatar/2021-08/1628499198955.jpg" />
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <n-h3 style={{ margin: 0, fontSize: '16px' }}>
                                        <n-ellipsis tooltip={false}>{$user.user.value.nickname}</n-ellipsis>
                                    </n-h3>
                                    <n-text>{`账号ID: ${$user.user.value.uid}`}</n-text>
                                </div>
                            </n-space>
                            <div class="n-chunk" style={{ columnGap: '12px', marginBottom: '12px' }}>
                                <nuxt-link to="/star" style={{ textDecoration: 'none', flex: 1 }}>
                                    <n-button quaternary focusable={false} size="large" style={{ width: '100%' }}>
                                        <n-h4 style={{ margin: 0 }}>账号设置</n-h4>
                                    </n-button>
                                </nuxt-link>
                                <nuxt-link to="/" style={{ textDecoration: 'none', flex: 1 }}>
                                    <n-button quaternary focusable={false} size="large" style={{ width: '100%' }}>
                                        <n-h4 style={{ margin: 0 }}>返回首页</n-h4>
                                    </n-button>
                                </nuxt-link>
                            </div>
                            <n-button focusable={false} size="large" onClick={closure}>
                                <n-h4 style={{ margin: 0 }}>退出登录</n-h4>
                            </n-button>
                        </n-element>
                    )
                }}
            </n-popover>
        )
    }
})
</script>
