// https://nuxt.com/docs/api/configuration/nuxt-config
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

const APP_NUXT_TITLE = `Wlisfes`
const APP_NUXT_DESCRIPTIOM = `${APP_NUXT_TITLE} - 一个神奇的网站，包括归档、问题、视频、收藏、生活等模块，让我告诉你关于它的一切。`

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
    runtimeConfig: {
        public: {
            APP_NUXT_TITLE: APP_NUXT_TITLE,
            APP_NUXT_DESCRIPTIOM: APP_NUXT_DESCRIPTIOM,
            CAPTCHA_PUBLIC_SITEKEY: process.env.CAPTCHA_PUBLIC_SITEKEY
        },
        MYSQL_HOST: process.env.MYSQL_HOST,
        MYSQL_PORT: process.env.MYSQL_PORT,
        MYSQL_USERNAME: process.env.MYSQL_USERNAME,
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
        MYSQL_DATABASE: process.env.MYSQL_DATABASE,
        JWT_EXPIRE: process.env.JWT_EXPIRE,
        JWT_SECRET: process.env.JWT_SECRET,
        CAPTCHA_PRIVATE_SITEKEY: process.env.CAPTCHA_PRIVATE_SITEKEY,
        NODEMAILER_HOST: process.env.NODEMAILER_HOST,
        NODEMAILER_PORT: process.env.NODEMAILER_PORT,
        NODEMAILER_SECURE: process.env.NODEMAILER_SECURE,
        NODEMAILER_USER: process.env.NODEMAILER_USER,
        NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD
    },
    nitro: {
        experimental: {
            openAPI: process.env.NODE_ENV === 'development'
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
            title: APP_NUXT_TITLE,
            charset: 'utf-8',
            viewport: 'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no',
            htmlAttrs: { lang: 'zh-CN' },
            meta: [
                { name: 'content-type', content: 'text/html;charset=utf-8' },
                { name: 'keywords', content: APP_NUXT_DESCRIPTIOM },
                { name: 'description', content: APP_NUXT_DESCRIPTIOM },
                { ['http-equiv']: 'x-ua-compatible', content: 'ie=edge,chrome=1' },
                { name: 'baidu-site-verification', content: '' },
                { property: 'og:title', content: APP_NUXT_TITLE },
                { property: 'og:keywords', content: APP_NUXT_DESCRIPTIOM },
                { property: 'og:description', content: APP_NUXT_DESCRIPTIOM }
            ],
            script: [{ src: `https://cdn.bootcdn.net/ajax/libs/jsencrypt/3.3.2/jsencrypt.min.js` }]
        }
    }
})
