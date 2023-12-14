// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'node:url'

function createBuilderTranspile(NODE_ENV: string) {
    if (NODE_ENV === 'production') {
        return ['naive-ui', 'vueuc', '@css-render/vue3-ssr', '@juggle/resize-observer']
    }
    return ['@juggle/resize-observer']
}

function createViteOptimizeInclude(NODE_ENV: string) {
    if (NODE_ENV === 'production') {
        return []
    }
    return ['naive-ui', 'vueuc', 'date-fns-tz/formatInTimeZone']
}

export default defineNuxtConfig({
    devServer: {
        port: 7000,
        host: '0.0.0.0'
    },
    devtools: {
        enabled: process.env.NODE_ENV === 'development'
    },
    alias: {
        '~image': fileURLToPath(new URL('./assets/image', import.meta.url))
    },
    css: ['@/assets/scss/index.scss'],
    build: {
        transpile: createBuilderTranspile(process.env.NODE_ENV as string)
    },
    vite: {
        plugins: [
            Components({
                resolvers: [NaiveUiResolver()]
            })
        ],
        optimizeDeps: {
            include: createViteOptimizeInclude(process.env.NODE_ENV as string)
        }
    },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1'
        }
    }
})
