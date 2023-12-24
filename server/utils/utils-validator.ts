import { plainToInstance, ClassConstructor } from 'class-transformer'
import { validateOrReject, ValidatorOptions, ValidationError } from 'class-validator'

/**错误处理**/
export async function divineEventWherer(nodeError: ValidationError) {
    const { constraints } = nodeError
    const messages = Object.keys(constraints).map(field => ({ field: constraints[field] }))
    return {
        message: constraints.isNotEmpty ?? messages[0].field,
        data: messages
    }
}

/**验证包装**/
export async function divineEventValidator<T>(cls: ClassConstructor<T>, state: { data: object; option?: ValidatorOptions }) {
    const post = plainToInstance(cls, state.data ?? {})
    return await validateOrReject(post as never, {
        validationError: { target: false, value: true },
        ...state.option
    }).catch(async errors => {
        const { data, message } = await divineEventWherer(errors[0])
        throw createError({
            statusCode: 400,
            message: message,
            data: data
        })
    })
}
