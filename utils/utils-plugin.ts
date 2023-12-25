/**开启谷歌验证**/
export function divineMaticChecker(): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const runtime = useRuntimeConfig()
            window.grecaptcha.ready(function () {
                window.grecaptcha.execute(runtime.public.GOOGLE_CAPTCHA_CLIENT_SITEKEY, { action: 'submit' }).then(resolve)
            })
        } catch (err) {
            reject(err)
        }
    })
}
