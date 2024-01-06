import nodemailer from 'nodemailer'
import handlebar from 'handlebars'
import path from 'path'
import fs from 'fs'

export let transporter: typeof nodemailer.createTransport
export async function createTransport() {
    if (!transporter) {
        const config = useRuntimeConfig()
        transporter = new nodemailer.createTransport({
            host: config.NODEMAILER_HOST,
            port: config.NODEMAILER_PORT,
            secure: config.NODEMAILER_SECURE,
            auth: {
                user: config.NODEMAILER_USER,
                pass: config.NODEMAILER_PASSWORD
            }
        })
    }
    return transporter
}

export interface SendMail {
    from: string
    to: string
    subject: string
    html: string
}

export function customNodemailer(transporter: any, opts: SendMail) {
    return new Promise((resolve, reject) => {
        return transporter.sendMail(opts, async (err: any, info: any) => {
            if (err) {
                reject(err)
            } else {
                resolve({ message: '发送成功', messageId: info.messageId })
            }
        })
    })
}

/**验证码发送**/
export async function customCheckNodemailer(transporter: any, opts: Pick<SendMail, 'from' | 'to'> & { code: string; ttl: string }) {
    try {
        const content = await readNodemailer({ code: opts.code, ttl: opts.ttl })
        return await customNodemailer(transporter, {
            from: `"Wlisfes" <${opts.from}>`,
            to: opts.to,
            subject: 'Document',
            html: content
        })
    } catch (err) {
        throw createError({ statusCode: 400, message: '发送失败', data: err })
    }
}

/**创建验证码**/ //prettier-ignore
export async function customCoder(pad: number = 6) {
    return Array.from({ length: pad }).map(e => Math.floor(Math.random() * 9).toString()).join('')
}

/**读取模板**/
export async function readNodemailer(option: Record<string, any> = {}) {
    const execute = handlebar.compile(fs.readFileSync(path.join(process.cwd(), './server/static/template/common.html'), 'utf8'))
    return execute(option)
}
