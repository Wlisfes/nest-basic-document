import nodemailer from 'nodemailer'

export default defineEventHandler(async event => {
    const config = useRuntimeConfig()
    event.context.transporter = new nodemailer.createTransport({
        host: config.NODEMAILER_HOST,
        port: config.NODEMAILER_PORT,
        secure: false,
        auth: {
            user: config.NODEMAILER_USER,
            pass: config.NODEMAILER_PASSWORD
        }
    })
})
