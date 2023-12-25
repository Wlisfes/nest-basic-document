// https://nuxt.com/docs/api/configuration/nuxt-config
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { loadEnv } from 'vite'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

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
    modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@vueuse/nuxt'],
    css: ['~/assets/scss/index.scss', '~/assets/scss/layout.scss', '~/assets/scss/common.scss'],
    ssr: true,
    devtools: {
        enabled: process.env.NODE_ENV === 'development'
    },
    experimental: {
        writeEarlyHints: false
    },
    devServer: {
        port: 7000,
        host: '0.0.0.0'
    },
    build: {
        transpile: createBuilderTranspile(process.env.NODE_ENV as string)
    },
    nitro: {
        experimental: {
            openAPI: true
        },
        esbuild: {
            options: {
                tsconfigRaw: {
                    compilerOptions: {
                        experimentalDecorators: true
                    }
                }
            }
        }
    },
    vite: {
        plugins: [
            Components({
                resolvers: [NaiveUiResolver()]
            }),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'assets/icons')],
                symbolId: 'icon-[name]'
            })
        ],
        optimizeDeps: {
            include: createViteOptimizeInclude(process.env.NODE_ENV as string)
        }
    },
    app: {
        head: {
            title: 'Wlisfes',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no' },
                { name: 'description', content: '(Wlisfes) 这是我的神奇网站，让我告诉你关于它的一切。' }
            ]
        }
    }
})
