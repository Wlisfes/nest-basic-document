import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { APP_NUXT, getStore } from '@/utils/utils-cookie'

export async function beforeResolver(to: RouteLocationNormalized, form: RouteLocationNormalized, next: NavigationGuardNext) {
    const uid = getStore(APP_NUXT.APP_NUXT_UID)

    console.log(`1111111111111111111111`)
    return next()
}

export function beforeClosure(to: RouteLocationNormalized, form: RouteLocationNormalized, next: NavigationGuardNext) {}

export function beforeAuthorize(to: RouteLocationNormalized, form: RouteLocationNormalized, next: NavigationGuardNext) {}
