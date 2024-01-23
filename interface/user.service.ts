import type { Notice, IUser, Result } from '@/types/instance.resolver'
import { useHeaders, divineRequestCatcher } from '@/utils/utils-cookie'

/**用户注册**/
export async function fetchUserRegister(data: { nickname: string; password: string; email: string; code: string }) {
    return await divineRequestCatcher<Notice>(
        await $fetch('/api/user/register', { headers: await useHeaders(), method: 'POST', body: data })
    )
}

/**登录**/
export async function fetchUserLoginer(data: { account: string; password: string; token: string }) {
    return await divineRequestCatcher<{ token: string; expire: number }>(
        await $fetch('/api/user/login', { headers: await useHeaders(), method: 'POST', body: data })
    )
}

/**用户信息**/
export async function fetchUserResolver() {
    return await divineRequestCatcher<IUser>(await $fetch('/api/user/resolver', { headers: await useHeaders(), method: 'GET' }))
}

/**用户列表**/
export async function fetchUserColumnr() {
    return await divineRequestCatcher<Result<IUser>>(await $fetch('/api/user/column', { headers: await useHeaders(), method: 'GET' }))
}
