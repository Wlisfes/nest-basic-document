import { H3Event, EventHandlerRequest } from 'h3'
import { moment } from '@/utils/utils-common'

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
