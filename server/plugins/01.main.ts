//@ts-nocheck
import { createConnection } from '@/server/lib/typeorm'
import { createOssProvider, createOssSTSProvider } from '@/server/lib/ali-oss'
import { createTransport } from '@/server/lib/nodemailer'

export default defineNitroPlugin(async nitroApp => {
    nitroApp.$db = await createConnection()
    nitroApp.$transporter = await createTransport()
    nitroApp.$ossClient = await createOssProvider()
    nitroApp.$ossSTSClient = await createOssSTSProvider()
})
