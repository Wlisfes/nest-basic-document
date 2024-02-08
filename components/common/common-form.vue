<script lang="tsx">
import { useVModels } from '@vueuse/core'
import type { FormInst, FormRules } from 'naive-ui'
interface FormNode {
    account: string
    password: string
}

export default defineNuxtComponent({
    name: 'CommonForm',
    props: {
        form: { type: Object as PropType<FormNode>, required: true }
    },
    setup(props, { emit }) {
        const formRef = ref<FormInst>()
        const { form } = useVModels(props, emit)
        const rules = ref<FormRules>({
            account: { required: true, trigger: ['blur', 'change'], message: '请输入邮箱/手机号' },
            password: { required: true, trigger: ['blur', 'change'], message: '请输入登录密码' }
        })

        return () => (
            <n-form ref={formRef} label-width={200} rules={rules.value} model={form.value}>
                <n-form-item path="account">
                    <n-input
                        v-model:value={form.value.account}
                        maxlength={32}
                        type="text"
                        input-props={{ autocomplete: 'off' }}
                        placeholder="请输入邮箱/手机号"
                    ></n-input>
                </n-form-item>
                <n-form-item path="password">
                    <n-input
                        v-model:value={form.value.password}
                        maxlength={18}
                        type="password"
                        show-password-on="mousedown"
                        input-props={{ autocomplete: 'current-password' }}
                        placeholder="请输入登录密码"
                    ></n-input>
                </n-form-item>
            </n-form>
        )
    }
})
</script>
