import { moment } from '@/utils/utils-common'

export default defineNitroPlugin(async nitroApp => {
    nitroApp.hooks.hook('beforeResponse', (event, response) => {
        const body = response.body as Record<string, any>
        if (typeof response.body === 'object') {
            response.body = {
                data: body,
                message: body.message ?? '请求成功',
                code: getResponseStatus(event),
                timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        }
    })
})
