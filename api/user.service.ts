import type { Result, Notice, IUser } from '@/interface/instance.resolver'
import { useHeaders, divineRequestCatcher } from '@/utils/utils-cookie'

/**用户注册**/
export async function fetchUserRegister(data: { nickname: string; password: string; mobile: string; code: string }) {
    return await divineRequestCatcher<Notice>(
        await $fetch('/api/user/register', { headers: await useHeaders(), method: 'POST', body: data })
    )
}

/**登录**/
export async function fetchUserAuthorize(data: { account: string; password: string; token: string }) {
    return await divineRequestCatcher<{ token: string; expire: number }>(
        await $fetch('/api/user/authorize', { headers: await useHeaders(), method: 'POST', body: data })
    )
}

/**用户信息**/
export async function fetchUserResolver() {
    return await divineRequestCatcher<IUser>(await $fetch('/api/user/resolver', { headers: await useHeaders(), method: 'GET' }))
}
