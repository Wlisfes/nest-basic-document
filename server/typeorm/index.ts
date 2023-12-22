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
            logging: false,
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
export async function createBaser<T>(db: DataSource, model: T) {
    return db.getRepository(model as never)
}

/**自定义查询实例**/
export async function createBuilder<T, R>(db: DataSource, model: T, callback: (qb: SelectQueryBuilder<ObjectLiteral>) => Promise<R>) {
    return await callback(db.getRepository(model as never).createQueryBuilder('tb'))
}
