import { useHeaders, divineRequestCatcher } from '@/utils/utils-cookie'

/**用户注册**/
export async function httpUserRegister(data: { nickname: string; password: string; mobile: string; code: string }) {
    return await divineRequestCatcher(
        await $fetch('/api/user/register', {
            headers: await useHeaders(),
            method: 'POST',
            body: data
        })
    )
}

/**登录**/
export async function httpUserAuthorize(data: { mobile: string; password: string; code: string }) {
    return await divineRequestCatcher(
        await $fetch('/api/user/authorize', {
            headers: await useHeaders(),
            method: 'POST',
            body: data
        })
    )
}

/**用户权限信息**/
export async function httpUserResolver() {
    return await divineRequestCatcher(
        await $fetch('/api/user/resolver', {
            headers: await useHeaders(),
            method: 'GET'
        })
    )
}
