import { divineEventWhereCatcher } from '@/server/utils/utils-validator'
import { divineIntNumber } from '@/utils/utils-common'
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

export enum FileMime {
    'image/jpeg' = 'jpg',
    'image/png' = 'png',
    'audio/mpeg' = 'mp3',
    'video/3gpp' = '3gp',
    'video/mp4' = 'mp4',
    'application/pdf' = 'pdf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' = 'xlsx'
}

/**文件重命名**/
export async function createRename(folder: string, suffix: string) {
    const name = await divineIntNumber(21)
    return folder + name + '.' + suffix
}

/*远程下载文件**/
export async function downloadFileBuffer(baseURL: string): Promise<{ suffix: string; blob: Blob; buffer: ArrayBuffer }> {
    try {
        const blob = await $fetch<Blob>(baseURL, { method: 'GET', responseType: 'blob' })
        await divineEventWhereCatcher(blob.size === 0, {
            message: '下载失败',
            data: blob
        })
        return await divineEventWhereCatcher(!FileMime[blob.type as keyof typeof FileMime], {
            message: '文件类型未知',
            data: blob
        }).then(async () => ({
            blob: blob,
            suffix: FileMime[blob.type as keyof typeof FileMime],
            buffer: await blob.arrayBuffer()
        }))
    } catch (err) {
        throw createError({ statusCode: 400, message: '下载失败', data: err })
    }
}

/**文件上传**/
export async function uploadFileBuffer(client: Client, option: { buffer: ArrayBuffer; fileName: string }) {
    try {
        const response = await client.put(option.fileName, Buffer.from(option.buffer))
        await divineEventWhereCatcher(response.res.status !== 200, {
            message: '上传失败',
            data: response
        }).then(() => {
            return {
                fileName: option.fileName,
                folder: response.name,
                fileURL: response.url,
                requestUrls: (response as any).requestUrls as Array<string>
            }
        })
    } catch (err) {
        throw createError({ statusCode: 400, message: '上传失败', data: err })
    }
}

/**创建OSS临时授权**/
export function createStorageSTSProvider(ossSTSClient: Client.STS) {}
