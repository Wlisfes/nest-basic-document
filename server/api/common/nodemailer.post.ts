import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator'
import { createBuilder, createBaser, createInserter } from '@/server/lib/typeorm'
import { TableUser } from '@/server/database'
import { divineEventValidator, divineEventCatcher, divineEventWhereCatcher } from '@/server/utils/utils-validator'
import { customCoder, customCheckNodemailer } from '@/server/lib/nodemailer'

export enum SourceEnum {
    Register = 'register',
    Password = 'password'
}

export class BodySchema {
    @IsEmail({}, { message: '邮箱 格式错误' })
    @IsNotEmpty({ message: '邮箱 必填' })
    email: string

    @IsNotEmpty({ message: '来源 必填' })
    @IsEnum(SourceEnum, { message: '来源类型错误' })
    source: SourceEnum
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
export async function getStorage(source: SourceEnum, opts: { email: string; code: string; ttl: number }) {
    const key = `document:${source}:email:${opts.email}`
    return await useStorage('redis').getItem(key)
}

export default defineEventHandler(async event => {
    return await divineEventCatcher(event, async evt => {
        const state = await readBody<BodySchema>(event)
        const config = useRuntimeConfig()
        const code = await customCoder(6)
        await divineEventValidator(BodySchema, { data: state })

        /**注册验证码******************************************************************/
        if (state.source === SourceEnum.Register) {
            return await createBuilder(event.context.db, TableUser, async qb => {
                return await qb.where('t.email = :email', { email: state.email }).getOne()
            }).then(async user => {
                await divineEventWhereCatcher(Boolean(user), {
                    message: '邮箱号已注册'
                })
                return await customCheckNodemailer(event.context.transporter, {
                    from: config.NODEMAILER_USER,
                    to: state.email,
                    ttl: '5',
                    code
                }).then(async result => {
                    await setStorage(state.source, {
                        email: state.email,
                        code: code,
                        ttl: 5 * 60
                    })
                    return result
                })
            })
        }

        /**修改密码******************************************************************/
        if (state.source === SourceEnum.Password) {
        }
    })
})
