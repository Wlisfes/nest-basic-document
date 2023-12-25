import 'reflect-metadata'
import { DataSource, SelectQueryBuilder, ObjectLiteral } from 'typeorm'
import * as BaseTable from '@/server/typeorm/database'

/**数据库表实体**/
export const BaseTables = Object.values(BaseTable)

export let dataSource: DataSource

export async function createConnection() {
    if (!dataSource) {
        dataSource = new DataSource({
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT ?? 3306),
            username: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
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
