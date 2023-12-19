import { Entity, Column } from 'typeorm'
import { TableCommon } from '@/server/typeorm/entity/table.common'

@Entity('table_user')
export class TableUser extends TableCommon {
    @Column({ type: 'varchar', comment: 'uid', update: false, nullable: false })
    uid: string

    @Column({ type: 'varchar', comment: '昵称', nullable: false })
    nickname: string

    @Column({ type: 'varchar', comment: '邮箱', nullable: true })
    email: string

    @Column({ type: 'varchar', comment: '头像', nullable: true })
    avatar: string

    @Column({ type: 'varchar', comment: '手机号', nullable: false })
    mobile: string

    @Column({
        type: 'varchar',
        comment: '密码',
        select: false,
        nullable: false
    })
    password: string
}
