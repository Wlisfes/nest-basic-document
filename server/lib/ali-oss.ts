import Client from 'ali-oss'

export let ossClient: Client
export let ossSTSClient: Client.STS

export async function createOssProvider() {
    if (!ossClient) {
        const config = useRuntimeConfig()
        ossClient = new Client({
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
    return ossClient
}

export async function createOssSTSProvider() {
    if (!ossSTSClient) {
        const config = useRuntimeConfig()
        ossSTSClient = new Client.STS({
            accessKeyId: config.OSS_ACCESSKEYID,
            accessKeySecret: config.OSS_ACCESSKEYSECRET
        })
    }
    return ossSTSClient
}
