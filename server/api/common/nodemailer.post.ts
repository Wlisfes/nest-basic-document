import { IsNotEmpty, IsEmail } from 'class-validator'
import { divineEventValidator, divineEventCatcher, divineEventWhereCatcher } from '@/server/utils/utils-validator'

export class BodySchema {
    @IsEmail({}, { message: '邮箱 格式错误' })
    @IsNotEmpty({ message: '邮箱 必填' })
    email: string

    @IsNotEmpty({ message: '来源 必填' })
    source: string
}

export function customNodemailer(transporter: any, option: any) {
    return new Promise((resolve, reject) => {
        return transporter.sendMail(option, (error: any, info: any) => {
            if (error) {
                reject(error)
            } else {
                resolve({ message: '发送成功' })
            }
        })
    })
}

export default defineEventHandler(async event => {
    return await divineEventCatcher(event, async evt => {
        const state = await readBody<BodySchema>(event)
        await divineEventValidator(BodySchema, { data: state })
        const config = useRuntimeConfig()
        return await customNodemailer(event.context.transporter, {
            from: `"测试邮件模板" <${config.NODEMAILER_USER}>`,
            to: state.email,
            subject: 'Hello',
            html: `<h1>Please enter the following verification code to bind your email</h1>`
        }).catch(async err => {
            return await divineEventWhereCatcher(true, {
                message: '发送失败',
                data: err
            })
        })
    })
})
