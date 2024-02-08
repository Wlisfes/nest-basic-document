import { Entity, Column } from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { TableCommon } from '@/server/database/table.common'

@Entity('table_user__roles')
export class TableUserRoles extends TableCommon {
    @IsNotEmpty({ message: '角色标识 必填', groups: ['key'] })
    @Column({ type: 'varchar', comment: '角色标识', nullable: false })
    key: string

    @IsNotEmpty({ message: '角色名称 必填', groups: ['name'] })
    @Column({ type: 'varchar', comment: '角色名称', nullable: false })
    name: string

    @IsNotEmpty({ message: '状态 必填', groups: ['status'] })
    @Column({ type: 'varchar', comment: '状态: 禁用-disable、启用-enable', default: 'enable', nullable: false })
    status: string

    @IsOptional({ groups: ['comment'], message: '角色描述 选填' })
    @Column({ type: 'varchar', comment: '角色描述', nullable: true })
    comment: string
}
