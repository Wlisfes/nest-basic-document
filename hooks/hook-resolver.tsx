import { ref, reactive, nextTick, onMounted } from 'vue'
import { isEmpty } from 'class-validator'
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
    request: (e: Omit<OptionResolver<T>, 'request'>) => Promise<Response<Result<T>>>
}

/**列表Hooks**/
export function useResolver<T>(opts: OptionResolver<T>) {
    const page = ref<number>(opts.page ?? 0)
    const size = ref<number>(opts.size ?? 0)
    const total = ref<number>(opts.total ?? 0)
    const loading = ref<boolean>(opts.loading ?? true)
    const initialize = ref<boolean>(opts.initialize ?? true)
    const dataSource = ref<Array<T>>(opts.dataSource ?? [])
    const dataColumn = ref<Array<DataTableBaseColumn>>(opts.dataColumn ?? [])
    const form = ref((opts.form ?? {}) as typeof opts.form)
    const option = ref((opts.option ?? {}) as typeof opts.option)
    const state = reactive({ page, size, total, loading, initialize, dataSource, dataColumn, form, option })

    onMounted(async () => {
        return await divineHandler(opts.immediate, async () => {
            return await fetchColumnHandler()
        })
    })

    function setState(
        data: Pick<OptionResolver<T>, 'page' | 'size' | 'total' | 'form' | 'option' | 'dataSource' | 'loading' | 'initialize'>
    ): Promise<typeof state> {
        return new Promise(async resolve => {
            await divineHandler(!isEmpty(data.form), () => {
                return (form.value = { ...form.value, ...data.form })
            })
            await divineHandler(!isEmpty(data.option), () => {
                return (option.value = { ...option.value, ...data.option })
            })
            await divineHandler(!isEmpty(data.page), () => {
                return (page.value = data.page)
            })
            await divineHandler(!isEmpty(data.size), () => {
                return (size.value = data.size)
            })
            await divineHandler(!isEmpty(data.total), () => {
                return (size.value = data.total)
            })
            await divineHandler(!isEmpty(data.dataSource), () => {
                return (dataSource.value = data.dataSource as never)
            })
            await divineHandler(!isEmpty(data.total), () => {
                return (size.value = data.total)
            })
            return await divineHandler(!isEmpty(data.initialize), () => {
                return (initialize.value = data.initialize)
            }).then(() => {
                return resolve(state)
            })
        })
    }

    /**初始化列表接口**/
    function fetchColumnHandler(handler?: Function): Promise<typeof state> {
        return new Promise(resolve => {
            return setState({ loading: true }).then(async () => {
                try {
                    const { data } = await opts.request(state as never)
                    await setState({ dataSource: data.list, total: data.total })
                } catch (err) {
                    await setState({ dataSource: [], total: 0 })
                } finally {
                    nextTick(async () => {
                        await setState({ loading: false, initialize: false })
                        await handler?.(state)
                        return await resolve(state)
                    })
                }
            })
        })
    }

    /**列表更新**/
    async function fetchUpdate(
        parameter: Pick<OptionResolver<T>, 'page' | 'size' | 'total' | 'form' | 'loading'>,
        handler?: Function
    ): Promise<typeof state> {
        await setState(parameter as never)
        return await fetchColumnHandler(handler as never)
    }

    return { page, size, total, loading, initialize, dataSource, dataColumn, form, option, state, setState, fetchUpdate }
}
