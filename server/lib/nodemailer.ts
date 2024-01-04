import nodemailer from 'nodemailer'

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
