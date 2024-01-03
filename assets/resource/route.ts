export const BaseRoute = [
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

export async function findSeoRoute(path: string) {
    return BaseRoute.find(item => item.url.indexOf(path) == 0)
}
