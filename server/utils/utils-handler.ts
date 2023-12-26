import { H3Event, EventHandlerRequest } from 'h3'
import { moment, divineHandler } from '@/utils/utils-common'

/**条件捕获、异常抛出**/
export async function divineCatchWherer(where: boolean, option: { message: string; code?: number; data?: any }) {
    return await divineHandler(where, () => {
        throw createError({
            statusCode: option.code ?? 400,
            message: option.message,
            data: option.data
        })
    })
}

/**错误捕获函数**/
export async function divineEventCatcher(
    event: H3Event<EventHandlerRequest>,
    handler: (event: H3Event<EventHandlerRequest>) => Promise<any>
) {
    try {
        const response = await handler(event)
        return {
            data: response || null,
            code: 200,
            message: response?.message ?? '请求成功',
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
        }
    } catch (e: any) {
        return {
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
            path: event.path,
            method: event.method,
            message: e.message,
            code: e.statusCode,
            data: e.data ?? undefined
        }
    }
}
