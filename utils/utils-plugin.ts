import JSEncrypt from 'JSEncrypt'
import { divineIntNumber } from '@/utils/utils-common'

/**开启谷歌验证**/
export async function divineMaticChecker(opts: { action: string }): Promise<string> {
    const config = useRuntimeConfig()
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(config.public.CAPTCHA_PUBLIC_SITEKEY)
    return encrypt.encrypt(
        JSON.stringify({
            action: opts.action,
            session: await divineIntNumber(16),
            referer: window.location.origin,
            timestamp: Date.now()
        })
    ) as string
}
