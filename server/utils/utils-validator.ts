import NodeRSA from 'node-rsa'
import { plainToInstance, ClassConstructor } from 'class-transformer'
import { validateOrReject, ValidatorOptions, ValidationError } from 'class-validator'
import { H3Event, EventHandlerRequest } from 'h3'
import { divineJwtVerifyAuthorize } from '@/server/utils/utils-handler'
import { moment, divineHandler } from '@/utils/utils-common'

/**参数聚合**/
export async function divineEventParameter<T extends Record<string, any>>(data: T) {
    return data
}

/**滑动验证码token解析**/
export async function divineEventTokenDecrypt(
    token: string
): Promise<{ action: string; session: string; referer: string; timestamp: number }> {
    try {
        const config = useRuntimeConfig()
        const privateKey = new NodeRSA(config.CAPTCHA_PRIVATE_SITEKEY)
        privateKey.setOptions({ encryptionScheme: 'pkcs1' })
        return JSON.parse(privateKey.decrypt(token, 'utf8'))
    } catch (e) {
        throw createError({ statusCode: 400, message: '验证码错误' })
    }
}

/**滑动验证码token验证**/
export async function divineEventSlideTokenValidator(event: H3Event<EventHandlerRequest>, token: string) {
    const node = await divineEventTokenDecrypt(token)
    const origin = getRequestHeader(event, 'origin')
    await divineEventWhereCatcher(node.referer !== origin, {
        message: '地址不合法'
    })
    await divineEventWhereCatcher(Date.now() - 180000 > node.timestamp, {
        message: '验证码已过期'
    })
    return node
}

/**JWT token验证**/
export async function divineEventJwtTokenValidator(
    event: H3Event<EventHandlerRequest>,
    option: { next: boolean; code?: number; message?: string }
): ReturnType<typeof divineJwtVerifyAuthorize> {
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
