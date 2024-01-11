import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator'
import { createBuilder, createBaser, createInserter } from '@/server/lib/typeorm'
import { TableUser } from '@/server/database'
import { SourceEnum, customCoder, customCheckNodemailer } from '@/server/lib/nodemailer'
import * as validator from '@/server/utils/utils-validator'

export class BodySchema {
    @IsEmail({}, { message: '邮箱 格式错误' })
    @IsNotEmpty({ message: '邮箱 必填' })
    email: string

    @IsNotEmpty({ message: 'Token 必填' })
    token: string

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
    return await validator.divineEventCatcher(event, async evt => {
        const state = await readBody<BodySchema>(event)
        const config = useRuntimeConfig()
        const code = await customCoder(6)
        await validator.divineEventValidator(BodySchema, { data: state })

        /**验证滑动验证**/
        await validator.divineEventSlideTokenValidator(event, state.token)

        /**注册验证码******************************************************************/
        if (state.source === SourceEnum.Register) {
            return await createBuilder(event.context.db, TableUser, async qb => {
                return await qb.where('t.email = :email', { email: state.email }).getOne()
            }).then(async user => {
                await validator.divineEventWhereCatcher(Boolean(user), {
                    message: '邮箱号已注册'
                })
                return await customCheckNodemailer(event.context.transporter, state.source, {
                    from: config.NODEMAILER_USER,
                    to: state.email,
                    data: { ttl: '5', code }
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
