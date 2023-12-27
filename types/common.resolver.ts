export interface Base {
    keyId: number
    createTime: string
    updateTime: string
}

export interface Notice {
    message: string
}

export interface Response<T> {
    timestamp: string
    path: string
    method: string
    message: string
    code: number
    data: T
}

export interface Result<T> {
    page: number
    size: number
    total: number
    list: Array<T>
}
