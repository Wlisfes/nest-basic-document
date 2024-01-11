import 'reflect-metadata'
import { DataSource, SelectQueryBuilder, Repository, ObjectLiteral, DeepPartial } from 'typeorm'
import * as BaseTable from '@/server/database'

/**数据库表实体**/
export const BaseTables = Object.values(BaseTable)

export let dataSource: DataSource

export async function createConnection() {
    if (!dataSource) {
        const config = useRuntimeConfig()
        dataSource = new DataSource({
            type: 'mysql',
            host: config.MYSQL_HOST,
            port: Number(config.MYSQL_PORT ?? 3306),
            username: config.MYSQL_USERNAME,
            password: config.MYSQL_PASSWORD,
            database: config.MYSQL_DATABASE,
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
    const qb = db.getRepository(model as never).createQueryBuilder('t')
    return await callback(qb)
}

/**保存数据**/
export async function inserter<T>(model: Repository<T>, state: DeepPartial<T>) {
    const node = await model.create(state)
    return model.save(node as typeof state)
}
