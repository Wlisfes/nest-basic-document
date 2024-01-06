import { IsNotEmpty, IsEmail } from 'class-validator'
import { divineEventValidator, divineEventCatcher } from '@/server/utils/utils-validator'
import { customCoder, customCheckNodemailer } from '@/server/lib/nodemailer'

export class BodySchema {
    @IsEmail({}, { message: '邮箱 格式错误' })
    @IsNotEmpty({ message: '邮箱 必填' })
    email: string

    @IsNotEmpty({ message: '来源 必填' })
    source: string
}

export default defineEventHandler(async event => {
    return await divineEventCatcher(event, async evt => {
        const state = await readBody<BodySchema>(event)
        await divineEventValidator(BodySchema, { data: state })
        const config = useRuntimeConfig()
        const code = await customCoder(6)
        return await customCheckNodemailer(event.context.transporter, {
            from: config.NODEMAILER_USER,
            to: state.email,
            ttl: '5',
            code
        }).then(async result => {
            const key = `document:register:email:${state.email}`
            await useStorage('redis').setItem(key, code, { ttl: 10 })
            return result
        })
    })
})
