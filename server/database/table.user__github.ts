import { Entity, Column } from 'typeorm'
import { TableCommon } from '@/server/database/table.common'

@Entity('table_user__github')
export class TableUserGitHub extends TableCommon {
    @Column({ type: 'varchar', comment: 'uid', update: false, nullable: false })
    uid: string

    @Column({ type: 'varchar', comment: 'GitHub id', update: false, nullable: false })
    id: string

    @Column({ type: 'varchar', comment: 'GitHub login', update: false, nullable: true })
    login: string

    @Column({ type: 'varchar', comment: 'GitHub avatar', nullable: true })
    avatar: string

    @Column({ type: 'varchar', comment: 'GitHub bio', nullable: true })
    bio: string

    @Column({ type: 'varchar', comment: 'GitHub url', nullable: true })
    url: string

    @Column({ type: 'varchar', comment: 'GitHub html_url', nullable: true })
    home: string

    @Column({ type: 'varchar', comment: 'GitHub name', nullable: true })
    name: string

    @Column({ type: 'varchar', comment: 'GitHub email', nullable: true })
    email: string

    @Column({ type: 'varchar', comment: 'GitHub location', nullable: true })
    location: string

    @Column({ type: 'varchar', comment: 'GitHub blog', nullable: true })
    blog: string
}
