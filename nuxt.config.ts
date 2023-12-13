// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({
    devtools: { enabled: true },
    devServer: {
        port: 7000,
        host: '0.0.0.0'
    },
    build: {
        transpile: ['naive-ui', 'vueuc', '@css-render/vue3-ssr', '@juggle/resize-observer']
    },
    vite: {
        plugins: [
            Components({
                resolvers: [NaiveUiResolver()] // Automatically register all components in the `components` directory
            })
        ],
        ssr: {
            noExternal: ['moment', 'naive-ui', '@juggle/resize-observer', '@css-render/vue3-ssr']
        },
        vue: { customElement: true },
        vueJsx: { mergeProps: true },
        optimizeDeps: {
            include: ['naive-ui', 'vueuc', 'date-fns-tz/formatInTimeZone']
        }
    },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1'
        }
    }
})
