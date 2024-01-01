import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export async function beforeResolver(to: RouteLocationNormalized, form: RouteLocationNormalized, next: NavigationGuardNext) {
    return next()
}

export function beforeClosure(to: RouteLocationNormalized, form: RouteLocationNormalized, next: NavigationGuardNext) {}

export function beforeAuthorize(to: RouteLocationNormalized, form: RouteLocationNormalized, next: NavigationGuardNext) {}
