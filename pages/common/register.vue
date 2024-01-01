<script lang="tsx">
export default defineNuxtComponent({
    name: 'Register',
    head: {
        titleTemplate: (title: string) => `${title} - 注册 | 一个神奇的网站`
    },
    setup() {
        return () => (
            <nuxt-layout name="client">
                <n-element class="layout-provider n-chunk n-column n-center n-middle n-auto no-selecter">
                    <n-element class="chunk-element">
                        <n-h1 style={{ textAlign: 'center' }}>注册账号</n-h1>
                        <n-form size="large" label-placement="left">
                            <n-form-item path="mobile">
                                <n-input maxlength={11} type="text" input-props={{ autocomplete: 'off' }}></n-input>
                            </n-form-item>
                            <n-form-item path="password">
                                <n-input
                                    maxlength={18}
                                    type="password"
                                    show-password-on="mousedown"
                                    input-props={{ autocomplete: 'new-password' }}
                                ></n-input>
                            </n-form-item>
                            <n-form-item>
                                <n-input-group>
                                    <n-input maxlength={4} style={{ flex: 1 }} />
                                    <n-skeleton width={130} height={40} sharp={false} />
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
                                <nuxt-link to="/common/authorize" style={{ textDecoration: 'none' }}>
                                    <n-button text focusable={false} style={{ fontSize: '18px' }}>
                                        登录
                                    </n-button>
                                </nuxt-link>
                            </n-space>
                        </n-form>
                    </n-element>
                </n-element>
            </nuxt-layout>
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
