import { Entity, Column } from 'typeorm'

@Entity('table_user')
export class TableUser {
    @Column({ comment: 'uid', update: false, nullable: false })
    uid!: string

    @Column({ comment: '昵称', nullable: false })
    nickname!: string
}
