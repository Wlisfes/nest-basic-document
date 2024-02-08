import type { Base } from '@/types/common.resolver'

export interface IRole extends Base {
    key: string
    name: string
    status: string
}

export interface IUser extends Base {
    uid: string
    nickname: string
    email: string
    avatar: string
    mobile: string
    status: string
    password: string
    roles: IRole[]
}
