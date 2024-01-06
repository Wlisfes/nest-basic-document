export function useAuthorize() {
    const config = useRuntimeConfig()

    console.log(config.public)
    async function navigateAuthorize(source: 'Github' | 'Google') {
        if (source === 'Github') {
            return await navigateTo(
                `https://github.com/login/oauth/authorize?client_id=${config.public.GITHUB_CLIENT_ID}&redirect_uri=${config.public.GITHUB_CLIENT_CALLBASE}&scope=user:email`,
                { external: true }
            )
        } else if (source === 'Google') {
            return
        }
        throw '类型错误'
    }

    return { navigateAuthorize }
}
