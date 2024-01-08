<script lang="tsx">
import { OnClickOutside } from '@vueuse/components'
import { useCustomize } from '@/hooks/hook-customize'
import { useAuthorize } from '@/hooks/hook-authorize'
import { useCountdate } from '@/hooks/hook-client'
import { createNotice } from '@/utils/utils-naive'
import { stop } from '@/utils/utils-common'
import * as http from '@/interface'

export default defineNuxtComponent({
    name: 'Register',
    components: { OnClickOutside },
    setup() {
        const { $store, $user } = useNuxtApp()
        const { immediate, date, setDateTime, start } = useCountdate()
        const { navigateAuthorize } = useAuthorize()
        const { formRef, state, setLoading, setDisabled, setVisible, divineFormValidater } = useCustomize({
            loading: false,
            option: { github: false, google: false },
            form: {
                email: 'limvcfast@gmail.com',
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

        /**发送邮箱验证码**/
        async function httpCommonNodemailer(evt: { token: string }) {
            try {
                await setVisible(false)
                const { message } = await http.fetchCommonNodemailer({
                    source: 'register',
                    email: state.form.email,
                    token: evt.token
                })
            } catch (e) {}
        }

        /**验证表单**/
        async function onEventChecker() {
            return divineFormValidater(async () => {
                await setDisabled(true)
                return await setVisible(true)
            })
        }

        return () => (
            <n-element class="layout-provider n-chunk n-column n-center n-middle n-auto no-selecter">
                <n-element class="chunk-element">
                    <n-h1 style={{ textAlign: 'center' }}>注册账号</n-h1>
                    <n-form size="large" label-placement="left">
                        <n-form-item path="mobile">
                            <n-input
                                maxlength={22}
                                type="text"
                                input-props={{ autocomplete: 'off' }}
                                disabled={state.disabled || state.loading}
                                placeholder="请输入昵称"
                            ></n-input>
                        </n-form-item>
                        <n-form-item path="password">
                            <n-input
                                maxlength={18}
                                type="password"
                                show-password-on="mousedown"
                                input-props={{ autocomplete: 'new-password' }}
                                disabled={state.disabled || state.loading}
                                placeholder="请输入登录密码"
                            ></n-input>
                        </n-form-item>
                        <n-form-item>
                            <n-input-group>
                                <n-input maxlength={6} style={{ flex: 1 }} placeholder="请输入邮箱验证码" />
                                <n-button
                                    type="primary"
                                    tertiary
                                    style={{ width: '130px' }}
                                    disabled={date.value > 0 || state.disabled || state.loading}
                                >
                                    {!immediate.value ? (
                                        <span>发送验证码</span>
                                    ) : (
                                        <span>{date.value > 0 ? `${date.value}s 重新发送` : `重新发送`}</span>
                                    )}
                                </n-button>
                            </n-input-group>
                        </n-form-item>
                        <n-form-item>
                            <n-button type="info" style={{ width: '100%' }}>
                                立即注册
                            </n-button>
                        </n-form-item>
                        <n-space justify="space-between" style={{ width: '100%', marginBottom: '5px' }}>
                            <nuxt-link to="/common/register" style={{ textDecoration: 'none' }}>
                                <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                    忘记密码
                                </n-button>
                            </nuxt-link>
                            <nuxt-link to="/common/login" style={{ textDecoration: 'none' }}>
                                <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                    登录
                                </n-button>
                            </nuxt-link>
                        </n-space>
                    </n-form>
                    <n-space size={32} wrap-item={false} justify="center" align="center" style={{ marginTop: '24px' }}>
                        <n-button
                            text
                            focusable={false}
                            disabled={state.option.google}
                            onClick={(evt: Event) => navigateAuthorize('Google', () => (state.option.google = true))}
                        >
                            {state.option.google ? (
                                <div class="n-chunk n-center n-middle" style={{ width: '48px', height: '48px' }}>
                                    <common-wrapper size={44} name="RadixSpin"></common-wrapper>
                                </div>
                            ) : (
                                <common-wrapper size={48} name="Google"></common-wrapper>
                            )}
                        </n-button>
                        <common-wrapper size={24} name="Specor"></common-wrapper>
                        <n-button
                            text
                            focusable={false}
                            disabled={state.option.github}
                            onClick={(evt: Event) => navigateAuthorize('Github', () => (state.option.github = true))}
                        >
                            {state.option.github ? (
                                <div class="n-chunk n-center n-middle" style={{ width: '48px', height: '48px' }}>
                                    <common-wrapper size={44} name="RadixSpin"></common-wrapper>
                                </div>
                            ) : (
                                <common-wrapper size={48} name="Github"></common-wrapper>
                            )}
                        </n-button>
                    </n-space>
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
