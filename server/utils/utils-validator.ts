import { plainToInstance, ClassConstructor } from 'class-transformer'
import { validateOrReject, ValidatorOptions, ValidationError } from 'class-validator'
import { H3Event, EventHandlerRequest } from 'h3'
import { TableUser } from '@/server/typeorm/database'
import { divineJwtVerifyAuthorize } from '@/server/utils/utils-handler'
import { moment, divineHandler } from '@/utils/utils-common'

/**token验证**/
export async function divineEventJwtTokenValidator(
    event: H3Event<EventHandlerRequest>,
    option: { next: boolean; code?: number; message?: string }
): Promise<TableUser> {
    const token = getRequestHeader(event, 'authorization')
    if (token) {
        try {
            return await divineJwtVerifyAuthorize(token).then(user => {
                event.context.user = user
                return user
            })
        } catch (e) {
            return (await divineHandler(!option.next, () => {
                throw createError({ statusCode: option.code ?? 401, message: option.message ?? '登录已过期' })
            })) as never
        }
    } else if (!option.next) {
        throw createError({ statusCode: option.code ?? 401, message: option.message ?? '未登录' })
    }
}

/**验证包装**/
export async function divineEventValidator<T>(cls: ClassConstructor<T>, state: { data: object; option?: ValidatorOptions }) {
    const post = plainToInstance(cls, state.data ?? {})
    return await validateOrReject(post as never, {
        validationError: { target: false, value: true },
        ...state.option
    }).catch(async errors => {
        const { constraints } = errors.shift() as ValidationError
        const data = Object.keys(constraints).map(field => ({ field: constraints[field] }))
        const message = constraints.isNotEmpty ?? data[0].field
        throw createError({
            statusCode: 400,
            message: message,
            data: data
        })
    })
}

/**条件捕获、异常抛出**/
export async function divineEventWhereCatcher(where: boolean, option: { message: string; code?: number; data?: any }) {
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
