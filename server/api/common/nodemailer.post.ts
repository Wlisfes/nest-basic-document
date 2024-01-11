import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator'
import { createBuilder } from '@/server/lib/typeorm'
import { TableUser } from '@/server/database'
import { SourceEnum, customCoder, customCheckNodemailer, setStorage } from '@/server/lib/nodemailer'
import { divineEventCatcher, divineEventValidator, divineEventWhereCatcher, divineEventSlideTokenValidator } from '@/server/utils/utils-validator'

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

export default defineEventHandler(async event => {
    return await divineEventCatcher(event, async evt => {
        const state = await readBody<BodySchema>(event)
        const config = useRuntimeConfig()
        const code = await customCoder(6)
        await divineEventValidator(BodySchema, { data: state })

        /**验证滑动验证**/
        await divineEventSlideTokenValidator(event, state.token)

        /**注册验证码******************************************************************/
        if (state.source === SourceEnum.Register) {
            return await createBuilder(event.context.db, TableUser, async qb => {
                return await qb.where('t.email = :email', { email: state.email }).getOne()
            }).then(async user => {
                await divineEventWhereCatcher(Boolean(user), {
                    message: '邮箱号已注册'
                })
                const result = await customCheckNodemailer(event.context.transporter, state.source, {
                    from: config.NODEMAILER_USER,
                    to: state.email,
                    data: { ttl: '5', code }
                })
                return await setStorage(state.source, { email: state.email, code: code, ttl: 5 * 60 }).then(() => {
                    return result
                })
            })
        }

        /**修改密码验证码******************************************************************/
        if (state.source === SourceEnum.Password) {
        }
    })
})
