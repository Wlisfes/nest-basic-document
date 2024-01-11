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
export enum SourceEnum {
    Register = 'register',
    Password = 'password'
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
export async function customCheckNodemailer(
    transporter: any,
    source: SourceEnum,
    opts: Pick<SendMail, 'from' | 'to'> & {
        data: { code: string; ttl: string; title?: string } & Record<string, any>
    }
) {
    try {
        const content = await readNodemailer(source, opts.data)
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
export async function readNodemailer(source: SourceEnum, option: Record<string, any> = {}) {
    const execute = handlebar.compile(fs.readFileSync(path.join(process.cwd(), `./server/static/template/${source ?? 'common'}.html`), 'utf8'))
    return execute(option)
}

/**邮件验证码redis存储**/
export async function setStorage(source: SourceEnum, opts: { email: string; code: string; ttl: number }) {
    const key = `document:${source}:email:${opts.email}`
    if (opts.ttl) {
        return await useStorage('redis').setItem(key, opts.code, { ttl: opts.ttl })
    } else {
        return await useStorage('redis').setItem(key, opts.code)
    }
}

/**邮件验证码redis读取**/
export async function getStorage(source: SourceEnum, opts: { email: string }) {
    const key = `document:${source}:email:${opts.email}`
    return await useStorage('redis').getItem(key)
}

/**邮件验证码redis删除**/
export async function delStorage(source: SourceEnum, opts: { email: string }) {
    const key = `document:${source}:email:${opts.email}`
    return await useStorage('redis').removeItem(key)
}
