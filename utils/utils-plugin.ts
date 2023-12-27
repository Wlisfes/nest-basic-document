import { load } from 'recaptcha-v3'

/**开启谷歌验证**/
export function divineMaticChecker(opts: { action: string }): Promise<string> {
    return new Promise((resolve, reject) => {
        const runtime = useRuntimeConfig()
        try {
            load(runtime.public.GOOGLE_CAPTCHA_CLIENT_SITEKEY).then(recaptcha => {
                recaptcha.execute(opts.action).then(token => {
                    console.log(token)
                    resolve(token)
                })
            })
        } catch (err) {
            reject(err)
        }
        // try {
        //     const runtime = useRuntimeConfig()
        //     window.grecaptcha.ready(function () {
        //         window.grecaptcha.execute(runtime.public.GOOGLE_CAPTCHA_CLIENT_SITEKEY, { action: 'login' }).then(resolve)
        //     })
        // } catch (err) {
        //     reject(err)
        // }
    })
}
