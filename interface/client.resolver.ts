import { Base } from '@/interface/common.resolver'

export interface IUser extends Base {
    uid: string
    nickname: string
    email: string
    avatar: string
    mobile: string
    status: string
    password: string
}
