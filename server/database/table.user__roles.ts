import { Entity, Column } from 'typeorm'
import { IsNotEmpty, Length, IsEmail, isEmpty } from 'class-validator'
import { TableCommon } from '@/server/database/table.common'

@Entity('table_user__roles')
export class TableUserRoles extends TableCommon {}
