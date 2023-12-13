// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({
    devtools: { enabled: true },
    devServer: {
        port: 7000,
        host: '0.0.0.0'
    },
    css: ['@/assets/css/index.scss'],
    build: {
        transpile: ['@juggle/resize-observer']
    },
    vite: {
        plugins: [
            Components({
                resolvers: [NaiveUiResolver()]
            })
        ],
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
