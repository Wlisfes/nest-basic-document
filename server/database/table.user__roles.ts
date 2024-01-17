import { Entity, Column } from 'typeorm'
import { IsNotEmpty, Length, IsEmail, isEmpty } from 'class-validator'
import { TableCommon } from '@/server/database/table.common'

@Entity('table_user__roles')
export class TableUserRoles extends TableCommon {
    @IsNotEmpty({ message: '角色标识 必填', groups: ['key'] })
    @Column({ type: 'varchar', comment: '角色标识', nullable: false })
    key: string

    @IsNotEmpty({ message: '角色名称 必填', groups: ['name'] })
    @Column({ type: 'varchar', comment: '角色名称', nullable: false })
    name: string
}
