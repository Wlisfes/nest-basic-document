import JSCookie from 'js-cookie'

/**存储**/
export async function setStore(key: string, data: any, expire?: number) {
    if (expire) {
        return JSCookie.set(key, JSON.stringify(data), {
            expires: Date.now() + expire
        })
    }
    return JSCookie.set(key, JSON.stringify(data))
}

/**读取**/
export function getStore<T>(key: string, devaultValue?: T): T {
    const node = JSCookie.get(key)
    return node ? JSON.parse(node) : devaultValue
}

/**删除**/
export async function delStore(key: string) {
    return JSCookie.remove(key)
}

export async function setToken(token: string, expire: number = 7200 * 1000) {
    return await setStore('APP_NUXT_TOKEN', token, expire)
}

export function getToken() {
    return getStore<string>('APP_NUXT_TOKEN')
}

export async function delToken() {
    return await delStore('APP_NUXT_TOKEN')
}
