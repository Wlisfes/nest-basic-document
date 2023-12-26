export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = getToken()
    if (process.client && token) {
        return await navigateTo(to.path === from.path ? '/' : from.path ?? '/')
    }
})
