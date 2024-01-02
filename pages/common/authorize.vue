<script lang="tsx">
import { OnClickOutside } from '@vueuse/components'
import { useCustomize } from '@/hooks/hook-customize'
import { createNotice } from '@/utils/utils-naive'
import { stop } from '@/utils/utils-common'
import { useUser } from '@/store/user'
import { APP_NUXT, setToken, getStore } from '@/utils/utils-cookie'
import * as http from '@/interface'

export default defineNuxtComponent({
    name: 'Authorize',
    components: { OnClickOutside },
    async setup() {
        await createSeoMeta('登录')
        const user = useUser()
        const { formRef, state, setLoading, setDisabled, setVisible, divineFormValidater } = useCustomize({
            loading: false,
            form: {
                account: 'limvcfast@gmail.com',
                password: '123456'
            },
            rules: {
                account: { required: true, trigger: ['blur', 'change'], message: '请输入邮箱/手机号' },
                password: { required: true, trigger: ['blur', 'change'], message: '请输入登录密码' }
            }
        })

        /**关闭验证码**/
        async function onOutsideCloser(evt: PointerEvent) {
            await setVisible(false)
            return await setDisabled(false)
        }

        /**验证表单**/
        async function onEventChecker() {
            return divineFormValidater(async () => {
                await setDisabled(true)
                return await setVisible(true)
            })
        }

        /**登录**/
        async function onSubmit(evt: { token: string; distance: string; reset: Function }) {
            try {
                await setLoading(true)
                await setDisabled(true)
                await setVisible(false)
                const { data, message } = await http.fetchUserAuthorize({
                    account: state.form.account,
                    password: window.btoa(state.form.password),
                    token: evt.token
                })
                await setToken(data.token, data.expire).then(async () => {
                    return await user.fetchUserResolver()
                })
                return await createNotice({
                    type: 'success',
                    title: message,
                    onAfterEnter: async () => {
                        await setLoading(false)
                        await navigateTo({ path: getStore(APP_NUXT.APP_NUXT_REDIRECT, '/') })
                    }
                })
            } catch (e) {
                await createNotice({ type: 'error', title: e.message })
                await setLoading(false)
                return await setDisabled(false)
            }
        }

        return () => (
            <n-element class="layout-provider n-chunk n-column n-center n-middle n-auto no-selecter">
                <n-element class="chunk-element">
                    <n-h1 style={{ textAlign: 'center' }}>欢迎回来</n-h1>
                    <n-form ref={formRef} model={state.form} rules={state.rules} size="large" label-placement="left">
                        <n-form-item path="account">
                            <n-input
                                v-model:value={state.form.account}
                                disabled={state.disabled || state.loading}
                                maxlength={11}
                                type="text"
                                input-props={{ autocomplete: 'off' }}
                                placeholder="请输入邮箱/手机号"
                            ></n-input>
                        </n-form-item>
                        <n-form-item path="password">
                            <n-input
                                v-model:value={state.form.password}
                                disabled={state.disabled || state.loading}
                                maxlength={18}
                                type="password"
                                show-password-on="mousedown"
                                input-props={{ autocomplete: 'current-password' }}
                                placeholder="请输入登录密码"
                            ></n-input>
                        </n-form-item>
                        <n-form-item>
                            <n-popover trigger="manual" style={{ padding: 0 }} show={state.visible}>
                                {{
                                    default: () => (
                                        <onClickOutside onTrigger={onOutsideCloser}>
                                            <common-captchar onSuccess={onSubmit}></common-captchar>
                                        </onClickOutside>
                                    ),
                                    trigger: () => (
                                        <n-button
                                            type="info"
                                            style={{ width: '100%' }}
                                            disabled={state.disabled}
                                            loading={state.loading}
                                            onClick={(e: Event) => stop(e, onEventChecker)}
                                        >
                                            立即登录
                                        </n-button>
                                    )
                                }}
                            </n-popover>
                        </n-form-item>
                        <n-space justify="space-between" style={{ width: '100%', marginBottom: '5px' }}>
                            <nuxt-link to="/common/register" style={{ textDecoration: 'none' }}>
                                <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                    忘记密码
                                </n-button>
                            </nuxt-link>
                            <nuxt-link to="/common/register" style={{ textDecoration: 'none' }}>
                                <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                    注册
                                </n-button>
                            </nuxt-link>
                        </n-space>
                    </n-form>
                </n-element>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.chunk-element {
    width: 100%;
    max-width: 414px;
    position: relative;
    padding: 20px;
    border-radius: 6px;
    background-color: var(--action-color);
    box-shadow: var(--box-shadow-1);
    box-sizing: border-box;
    a {
        position: relative;
        display: block;
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
    }
}
</style>
