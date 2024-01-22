import { type CSSProperties } from 'vue'
import dayjs from 'dayjs'

/**时间处理函数**/
export const moment = dayjs

/**回车事件**/
export async function enter(e: KeyboardEvent, handler?: Function) {
    if (e.key === 'Enter' && typeof handler === 'function') {
        await handler()
    }
    return e
}

/**事件默认处理**/
export async function prevent(e: Event, handler?: Function) {
    e.preventDefault()
    if (typeof handler === 'function') {
        await handler()
    }
    return e
}

/**事件阻止处理**/
export async function stop(e: Event, handler?: Function) {
    e.preventDefault()
    e.stopPropagation()
    if (typeof handler === 'function') {
        await handler()
    }
    return e
}

/**生成时间戳组合数字**/
export async function divineIntNumber(pad: number = 16) {
    const date = Math.floor(Date.now() / 1000)
    const suffix = Array.from({ length: pad }, e => Math.floor(Math.random() * 9).toString())
    return [date, ...suffix].join('').slice(0, pad)
}

/**生成N位随机符串**/
export async function divineIntCharacter(
    pad: number = 16,
    character: string = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`
) {
    return Array.from({ length: pad }, e => character.charAt(Math.floor(Math.random() * character.length))).join('')
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

/**条件返回值**/
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
