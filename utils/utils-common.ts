import { type CSSProperties } from 'vue'
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

/**条件样式返回值**/
export function divineWherer<T = CSSProperties>(where: boolean, whereValue: T = {} as T, defaultValue: T = {} as T) {
    return where ? whereValue : defaultValue
}

/**延时方法**/
export function divineDelay(delay = 100, handler?: Function) {
    return new Promise(resolve => {
        const timeout = setTimeout(() => {
            handler?.()
            resolve(undefined)
            clearTimeout(timeout)
        }, delay)
    })
}
