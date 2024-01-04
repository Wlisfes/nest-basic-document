import { createConnection } from '@/server/lib/typeorm'
import { createOssProvider, createOssSTSProvider } from '@/server/lib/ali-oss'
import { createTransport } from '@/server/lib/nodemailer'

export default defineEventHandler(async event => {
    event.context.db = await createConnection()
    event.context.transporter = await createTransport()
    event.context.ossClient = await createOssProvider()
    event.context.ossSTSClient = await createOssSTSProvider()
})
