import { IsNotEmpty, IsEmail } from 'class-validator'
import { divineEventValidator, divineEventCatcher } from '@/server/utils/utils-validator'
import handlebar from 'handlebars'
import path from 'path'
import fs from 'fs'

export class BodySchema {
    @IsEmail({}, { message: '邮箱 格式错误' })
    @IsNotEmpty({ message: '邮箱 必填' })
    email: string

    @IsNotEmpty({ message: '来源 必填' })
    source: string
}

/**读取模板**/
export async function readNodemailer(option: Record<string, any> = {}) {
    const execute = handlebar.compile(fs.readFileSync(path.join(process.cwd(), './server/static/template/common.html'), 'utf8'))
    return execute(option)
}

export function customNodemailer(transporter: any, option: any) {
    return new Promise((resolve, reject) => {
        return transporter.sendMail(option, async (error: any, info: any) => {
            if (error) {
                reject(error)
            } else {
                resolve({ message: '发送成功', messageId: info.messageId })
            }
        })
    })
}

export default defineEventHandler(async event => {
    return await divineEventCatcher(event, async evt => {
        const state = await readBody<BodySchema>(event)
        await divineEventValidator(BodySchema, { data: state })
        const config = useRuntimeConfig()
        const content = await readNodemailer({ code: '123456', ttl: '5' })
        return await customNodemailer(event.context.transporter, {
            from: `"Wlisfes" <${config.NODEMAILER_USER}>`,
            to: state.email,
            subject: 'Document',
            html: content
        }).catch(err => {
            throw createError({ statusCode: 400, message: '发送失败', data: err })
        })
    })
})
