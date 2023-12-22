import { createBaser } from '@/server/typeorm'
import { TableUser } from '@/server/typeorm/entity'
import { validate, validateOrReject, IsNotEmpty, Length } from 'class-validator'
import { Exclude } from 'class-transformer'

export class Register {
    @IsNotEmpty({ message: '密码 必填' })
    @Length(6, 18, { message: '密码格式错误' })
    password: string
}

export default defineEventHandler(async event => {
    const body = await readBody(event)
    const post = new TableUser()
    // post.password = body.password
    post.setUid(body.password)
    validateOrReject(post).catch(errors => {
        console.log('🤧🤧🤧🤧 Promise rejected (validation failed). Errors: ', errors)
    })

    // 如果验证失败不会停止运行程序
    validate(post).then(errors => {
        if (errors.length > 0) {
            console.log('😈😈😈😈 validation failed. errors: ', errors)
        } else {
            console.log('validation succeed')
        }
    })

    return await createBaser(event.context.db, TableUser).then(async model => {
        return {
            code: 200,
            list: model.find()
        }
    })
})
