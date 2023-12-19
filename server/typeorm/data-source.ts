import { DataSource } from 'typeorm'
import * as BaseTable from '@/typeorm/entity'

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

export async function initialize() {
    if (AppDataSource.isInitialized) {
        console.warn('DB: Already initialized')
        return AppDataSource
    } else {
        try {
            await AppDataSource.initialize()
        } catch (err) {
            console.trace('DB: Failed to initialized database', err)
        }
    }
}
