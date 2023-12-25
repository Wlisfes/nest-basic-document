import type { FormInst, FormRules, FormItemRule } from 'naive-ui'
import { ref, reactive } from 'vue'
import { divineHandler, divineDelay } from '@/utils/utils-common'

interface Option<T extends Record<string, any>> {
    initialize?: boolean
    disabled?: boolean
    visible?: boolean
    loading?: boolean
    rules?: FormRules
    form: T
}

/**自定义表单Hooks**/
export function useCustomize<T extends Object>(data: Option<T>) {
    const formRef = ref<FormInst & { $el: Element }>()
    const initialize = ref<boolean>(data.initialize ?? true)
    const disabled = ref<boolean>(data.disabled ?? false)
    const visible = ref<boolean>(data.visible ?? false)
    const loading = ref<boolean>(data.loading ?? false)
    const form = ref<typeof data.form>(data.form)
    const rules = ref<typeof data.rules>(data.rules)
    const state = reactive({ initialize, disabled, visible, loading, form, rules })

    async function setInitialize(value: boolean) {
        return (initialize.value = value)
    }

    async function setDisabled(value: boolean) {
        return (disabled.value = value)
    }

    async function setVisible(value: boolean) {
        return (visible.value = value)
    }

    async function setLoading(value: boolean) {
        return (loading.value = value)
    }

    async function setForm(value: Partial<T>) {
        return (form.value = { ...form.value, ...value })
    }

    /**验证表单**/
    function divineFormValidater(
        callback: Function = Function,
        app: { reject?: boolean; catch?: Function; formatter?: (e: FormItemRule) => boolean } = {}
    ) {
        return new Promise((resolve, reject) => {
            if (!formRef.value) {
                return reject('不存在formRef实例')
            }
            //prettier-ignore
            formRef.value.validate(async err => {
                if (!err) {
                    return resolve(await callback())
                }
            }, app.formatter).catch(err => {
                app.catch && app.catch(err)
                app.reject && reject(err)
            })
        })
    }

    /**重置表单校验结果**/
    function divineFormRestore() {
        return new Promise((resolve, reject) => {
            if (!formRef.value) {
                return reject('不存在formRef实例')
            }
            return resolve(formRef.value.restoreValidation())
        })
    }

    /**滚动到第一个报错表单选项**/
    async function divineFormScrollbar() {
        await divineDelay(0)
        return await divineHandler(Boolean(formRef.value), async () => {
            const element = formRef.value!.$el.querySelector('.el-form-item__error')
            return element!.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        })
    }

    return {
        initialize,
        disabled,
        visible,
        loading,
        form,
        rules,
        state,
        formRef,
        setInitialize,
        setDisabled,
        setVisible,
        setLoading,
        setForm,
        divineFormValidater,
        divineFormRestore,
        divineFormScrollbar
    }
}
