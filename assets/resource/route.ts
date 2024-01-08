export interface BaseRoute {
    url: string
    name: string
}

export const common: Array<BaseRoute> = [
    {
        url: '/common/login',
        name: '登录'
    },
    {
        url: '/common/register',
        name: '注册'
    }
]

export const client: Array<BaseRoute> = [
    {
        url: '/',
        name: '一个神奇的网站'
    },
    {
        url: '/document',
        name: '归档'
    },
    {
        url: '/issues',
        name: '问题'
    },
    {
        url: '/video',
        name: '视频'
    },
    {
        url: '/star',
        name: '收藏'
    },
    {
        url: '/lifer',
        name: '生活'
    }
]

export const manager: Array<BaseRoute> = []

export const routes: Array<BaseRoute> = [].concat(client, common, manager)

export async function findSeoRoute(path: string) {
    const node = routes.find(item => item.url === path)
    return node
}
