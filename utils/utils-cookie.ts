import { divineHandler } from '@/utils/utils-common'
import { createNotice } from '@/utils/utils-naive'
import type { Response } from '@/types/common.resolver'

/**存储字段名称**/
export enum APP_NUXT {
    APP_NUXT_UID = 'APP_NUXT_UID',
    APP_NUXT_TOKEN = 'APP_NUXT_TOKEN',
    APP_NUXT_REDIRECT = 'APP_NUXT_REDIRECT',
    APP_NUXT_THEME = 'APP_NUXT_THEME',
    APP_NUXT_PRIMARY_COLOR = 'APP_NUXT_PRIMARY_COLOR'
}

export function useStore() {
    const uid = useCookie(APP_NUXT.APP_NUXT_UID, { watch: true })
    const token = useCookie(APP_NUXT.APP_NUXT_TOKEN, { watch: true, maxAge: 7200 })
    const redirect = useCookie(APP_NUXT.APP_NUXT_REDIRECT, { watch: true, default: () => '/' })
    const theme = useCookie(APP_NUXT.APP_NUXT_THEME, { watch: true, default: () => 'dark' })
    const primaryColor = useCookie(APP_NUXT.APP_NUXT_PRIMARY_COLOR, { watch: true, default: () => '#18a058' })

    const store = computed(() => ({
        uid: uid.value,
        token: token.value,
        redirect: redirect.value,
        theme: theme.value,
        primaryColor: primaryColor.value
    }))

    async function setUid(value?: string, handler?: Function) {
        await divineHandler(Boolean(handler), () => handler(value)).then(() => {
            return (uid.value = value)
        })
    }

    async function setToken(value?: string, handler?: Function) {
        await divineHandler(Boolean(handler), () => handler(value)).then(() => {
            return (token.value = value)
        })
    }

    async function setRedirect(value?: string, handler?: Function) {
        await divineHandler(Boolean(handler), () => handler(value)).then(() => {
            return (redirect.value = value)
        })
    }

    async function setTheme(value: 'light' | 'dark', handler?: Function) {
        await divineHandler(Boolean(handler), () => handler(value)).then(() => {
            return (theme.value = value)
        })
    }

    async function setPrimaryColor(value: string, handler?: Function) {
        return await divineHandler(Boolean(handler), handler(value)).then(() => {
            return (primaryColor.value = value)
        })
    }

    return { store, setUid, setToken, setRedirect, setTheme, setPrimaryColor }
}

export async function useHeaders(headers: Record<string, string> = {}) {
    const { store } = useStore()
    await divineHandler(Boolean(store.value.token), () => {
        headers.Authorization = store.value.token
    })
    return headers
}

export function divineRequestCatcher<T>(result: Response<T>, option: Partial<{ notice: boolean }> = {}): Promise<Response<T>> {
    return new Promise(async (resolve, reject) => {
        try {
            if (200 === result.code) {
                return resolve(result)
            } else {
                return await divineHandler(option.notice ?? true, async () => {
                    return await createNotice({ type: 'error', title: result.message })
                }).then(async () => {
                    if (result.code === 401) {
                        await navigateTo({ path: '/', replace: true })
                    }
                    return reject(result)
                })
            }
        } catch (err) {
            return await divineHandler(option.notice ?? true, async () => {
                return await createNotice({ type: 'error', title: err.message })
            }).then(() => {
                return reject(err)
            })
        }
    })
}
