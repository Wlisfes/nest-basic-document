import Client from 'ali-oss'

export let OSS_CLIENT: Client
export let OSS_STS_CLIENT: Client.STS

export async function createOssProvider() {
    if (!OSS_CLIENT) {
        const config = useRuntimeConfig()
        OSS_CLIENT = new Client({
            region: config.OSS_REGION,
            endpoint: config.OSS_ENDPOINT,
            accessKeyId: config.OSS_ACCESSKEYID,
            accessKeySecret: config.OSS_ACCESSKEYSECRET,
            bucket: config.OSS_BUCKET,
            timeout: config.OSS_TIMEOUT,
            internal: false,
            secure: true,
            cname: true
        })
    }
    return OSS_CLIENT
}

export async function createOssSTSProvider() {
    if (!OSS_STS_CLIENT) {
        const config = useRuntimeConfig()
        OSS_STS_CLIENT = new Client.STS({
            accessKeyId: config.OSS_ACCESSKEYID,
            accessKeySecret: config.OSS_ACCESSKEYSECRET
        })
    }
    return OSS_STS_CLIENT
}
