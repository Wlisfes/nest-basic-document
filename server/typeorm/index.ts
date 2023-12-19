import 'reflect-metadata'
import { DataSource, Entity, SelectQueryBuilder, ObjectLiteral } from 'typeorm'
import * as BaseTable from '@/server/typeorm/entity'

/**数据库表实体**/
export const BaseTables = Object.values(BaseTable)

export let dataSource: DataSource

export async function createConnection() {
    if (!dataSource) {
        dataSource = new DataSource({
            type: 'mysql',
            host: '121.199.41.193',
            port: 3306,
            username: 'document',
            password: 'ejDSRcLEtbT6tkPJ',
            database: 'document',
            synchronize: true,
            logging: true,
            entities: BaseTables,
            subscribers: [],
            migrations: []
        })
    }
    if (!dataSource.isInitialized) {
        await dataSource.initialize()
    }
    return dataSource
}

/**自定义表实例**/
export async function createBaser<T>(model: T) {
    return await createConnection().then(base => {
        return base.getRepository(model as never)
    })
}

/**自定义查询实例**/
export async function createBuilder<T, R>(model: T, callback: (qb: SelectQueryBuilder<ObjectLiteral>) => Promise<R>) {
    return await createConnection().then(async base => {
        const qb = base.getRepository(model as never).createQueryBuilder('tb')
        return await callback(qb)
    })
}
