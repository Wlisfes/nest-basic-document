import jwt from 'jsonwebtoken'
import { TableUser } from '@/server/typeorm/database'

/**jwt加密**/
export async function divineJwtSignAuthorize(data: Partial<TableUser>): Promise<{ token: string; expire: number }> {
    const config = useRuntimeConfig()
    return {
        expire: Number(config.JWT_EXPIRE || 7200),
        token: await jwt.sign(data, config.JWT_SECRET, {
            expiresIn: Number(config.JWT_EXPIRE || 7200)
        })
    }
}

/**jwt解密**/
export async function divineJwtVerifyAuthorize(token: string): Promise<TableUser> {
    const config = useRuntimeConfig()
    return (await jwt.verify(token, 'mysecrettoken')) as TableUser
}
