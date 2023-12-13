// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    devServer: {
        port: 7000,
        host: '0.0.0.0'
    },
    vite: {
        vue: { customElement: true },
        vueJsx: { mergeProps: true }
    },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1'
        }
    }
})
