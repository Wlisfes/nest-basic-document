import { divineIntNumber } from '@/utils/utils-common'

/**开启谷歌验证**/
export async function divineMaticChecker(opts: { action: string }): Promise<string> {
    const config = useRuntimeConfig()
    const encrypt = new window.JSEncrypt()
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

/**更新头部seo优化**/
export async function createSeoMeta(name: string, suffix: string = '一个神奇的网站') {
    return useSeoMeta({
        title: 'Wlisfes',
        titleTemplate: `Wlisfes - ${name}` + suffix ? ` | ${suffix}` : '',
        ogTitle: 'Wlisfes',
        description: `Wlisfes - ${name} | 一个神奇的网站，让我告诉你关于它的一切。`,
        ogDescription: `Wlisfes - ${name} | 一个神奇的网站，让我告诉你关于它的一切。`,
        ogImage: 'https://lisfes.cn/favicon.ico',
        twitterCard: 'summary_large_image'
    })
}
