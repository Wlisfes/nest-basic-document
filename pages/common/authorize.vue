<script lang="tsx">
import { divineMaticChecker } from '@/utils/utils-plugin'
import * as http from '@/api'

export default defineNuxtComponent({
    name: 'Authorize',
    head: (app: any) => ({
        titleTemplate: (title: string) => `${title} - 登录`,
        link: [
            { rel: 'preconnect', href: 'https://www.google.com' },
            { rel: 'preconnect', href: 'https://www.gstatic.com', crossorigin: 'anonymous' }
        ],
        script: [{ async: true, src: `https://www.google.com/recaptcha/api.js?render=${app.$config.public.GOOGLE_CAPTCHA_CLIENT_SITEKEY}` }]
    }),
    setup() {
        /**登录**/
        async function onSubmit(evt: Event) {
            const token = await divineMaticChecker()
            console.log(token)
        }

        return () => (
            <n-element class="layout-provider n-chunk n-column n-center n-middle n-auto no-selecter">
                <n-element class="chunk-element">
                    <n-h1 style={{ textAlign: 'center' }}>欢迎回来</n-h1>
                    <n-form size="large" label-placement="left">
                        <n-form-item path="mobile">
                            <n-input maxlength={11} type="text" input-props={{ autocomplete: 'off' }}></n-input>
                        </n-form-item>
                        <n-form-item path="password">
                            <n-input
                                maxlength={18}
                                type="password"
                                show-password-on="mousedown"
                                input-props={{ autocomplete: 'current-password' }}
                            ></n-input>
                        </n-form-item>
                        <n-form-item>
                            <n-button type="info" style={{ width: '100%' }} onClick={onSubmit}>
                                立即登录
                            </n-button>
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
