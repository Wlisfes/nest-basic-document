import type { Notice } from '@/types/instance.resolver'
import { useHeaders, divineRequestCatcher } from '@/utils/utils-cookie'

/**发送邮箱验证码**/
export async function fetchCommonNodemailer(data: { email: string; token: string; source: string }) {
    return await divineRequestCatcher<Notice>(
        await $fetch('/api/common/nodemailer', { headers: await useHeaders(), method: 'POST', body: data })
    )
}
