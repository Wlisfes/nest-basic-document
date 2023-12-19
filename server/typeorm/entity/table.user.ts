import { Entity, Column } from 'typeorm'
import { TableCommon } from '@/server/typeorm/entity/table.common'

@Entity('table_user')
export class TableUser extends TableCommon {
    @Column({ type: 'varchar', comment: 'uid', update: false, nullable: false })
    uid!: string

    @Column({ type: 'varchar', comment: '昵称', nullable: false })
    nickname!: string
}
