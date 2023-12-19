import 'reflect-metadata'
import { DataSource } from 'typeorm'
import * as BaseTable from '@/server/typeorm/entity'

/**数据库表实体**/
export const BaseTables = Object.values(BaseTable)

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: '121.199.41.193',
    port: 3306,
    username: 'document',
    password: 'ejDSRcLEtbT6tkPJ',
    database: 'document',
    entities: BaseTables
})

export const connection = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
    }
    return AppDataSource
}
