import { type CSSProperties } from 'vue'
import dayjs from 'dayjs'

/**时间处理函数**/
export function moment(date?: dayjs.ConfigType) {
    return dayjs(date)
}

/**事件默认处理**/
export function prevent(e: Event, handler?: Function) {
    e.preventDefault()
    return handler?.(e)
}

/**事件阻止处理**/
export function stop(e: Event, handler?: Function) {
    e.preventDefault()
    e.stopPropagation()
    return handler?.(e)
}

/**生成时间戳组合数字**/
export async function divineIntNumber(pad: number = 16) {
    const date = Math.floor(Date.now() / 1000)
    const suffix = [Math.random(), Math.random()].map(x => x.toString().slice(2))
    return [date, ...suffix].join('').slice(0, pad)
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
