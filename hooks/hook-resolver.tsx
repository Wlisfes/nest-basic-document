import { ref, computed, onMounted } from 'vue'
import { divineHandler } from '@/utils/utils-common'
import { type DataTableBaseColumn } from 'naive-ui'
import { type Result, type Response } from '@/types/common.resolver'

export interface OptionResolver<T> {
    page?: number
    size?: number
    total?: number
    loading?: boolean
    immediate?: boolean
    initialize?: boolean
    dataSource?: Array<T>
    dataColumn?: Array<DataTableBaseColumn>
    form?: Record<string, any>
    option?: Record<string, any>
}

export interface OptionRequestResolver<T> extends OptionResolver<T> {
    request: (e: OptionResolver<T>) => Promise<Response<Result<T>>>
}

/**列表Hooks**/
export function useResolver<T>(opts: OptionRequestResolver<T>) {
    const page = ref<number>(opts.page ?? 0)
    const size = ref<number>(opts.size ?? 0)
    const total = ref<number>(opts.total ?? 0)
    const loading = ref<boolean>(opts.loading ?? true)
    const initialize = ref<boolean>(opts.initialize ?? true)
    const dataSource = ref<Array<T>>(opts.dataSource ?? [])
    const dataColumn = ref<Array<DataTableBaseColumn>>(opts.dataColumn ?? [])
    const form = ref((opts.form ?? {}) as typeof opts.form)
    const option = ref((opts.option ?? {}) as typeof opts.option)
    const state = computed(() => {
        return {
            page: page.value,
            size: size.value,
            total: total.value,
            loading: loading.value,
            initialize: initialize.value,
            dataSource: dataSource.value,
            dataColumn: dataColumn.value,
            form: form.value,
            option: option.value
        }
    })

    onMounted(async () => {
        return await divineHandler(opts.immediate, async () => {
            return await fetchColumnHandler()
        })
    })

    async function setInitialize(value: boolean) {
        return (initialize.value = value)
    }

    async function setForm(value: Partial<typeof opts.form>) {
        return (form.value = { ...form.value, ...value })
    }

    async function setOption(value: Partial<typeof opts.option>) {
        return (option.value = { ...option.value, ...value })
    }

    async function setDataColumn(value: Array<DataTableBaseColumn>) {
        return (dataColumn.value = value)
    }

    async function setState(
        data: Pick<OptionResolver<T>, 'page' | 'size' | 'total' | 'loading' | 'dataSource'> = {}
    ): Promise<OptionResolver<T>> {
        loading.value = data.loading ?? loading.value
        page.value = data.page ?? page.value
        size.value = data.size ?? size.value
        total.value = data.total ?? total.value
        dataSource.value = (data.dataSource ?? dataSource.value) as Array<never>
        return state.value as OptionResolver<T>
    }

    /**初始化列表接口**/
    async function fetchColumnHandler() {
        try {
            await setState({ loading: true })
            const { data } = await opts.request(state.value as OptionResolver<T>)
            await setInitialize(false)
            return await setState({
                dataSource: Array.from({ length: 100 }, () => data.list[0]),
                total: data.total,
                loading: false
            })
        } catch (err) {
            await setInitialize(false)
            return await setState({ dataSource: [], total: 0, loading: false })
        }
    }

    /**列表更新**/
    async function fetchUpdate(parameter: Pick<OptionResolver<T>, 'page' | 'size' | 'total' | 'loading'>) {
        await setState(parameter)
        return await fetchColumnHandler()
    }

    return {
        page,
        size,
        total,
        loading,
        initialize,
        dataSource,
        dataColumn,
        form,
        option,
        state,
        setInitialize,
        setForm,
        setOption,
        setDataColumn,
        fetchUpdate,
        setState
    }
}
