import dayjs from 'dayjs'

export function moment(date?: dayjs.ConfigType) {
    return dayjs(date)
}

/**条件函数执行**/
export async function divineHandler<T>(value: boolean | Function, handler: Function, callback?: Function): Promise<T | void> {
    if ((typeof value === 'boolean' && value) || (typeof value === 'function' && (await value()))) {
        return await handler()
    } else if (typeof callback === 'function') {
        return await callback()
    }
    return undefined
}
