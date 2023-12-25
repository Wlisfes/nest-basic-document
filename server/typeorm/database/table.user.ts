import { Entity, Column } from 'typeorm'
import { IsNotEmpty, Length, IsEmail } from 'class-validator'
import { IsMobile } from '@/server/utils/utils-decorator'
import { TableCommon } from '@/server/typeorm/database/table.common'

@Entity('table_user')
export class TableUser extends TableCommon {
    @IsNotEmpty({ message: 'UID 必填', groups: ['uid'] })
    @Column({ type: 'varchar', comment: 'uid', update: false, nullable: false })
    uid: string

    @IsNotEmpty({ message: '用户昵称 必填', groups: ['nickname'] })
    @Column({ type: 'varchar', comment: '昵称', nullable: false })
    nickname: string

    @IsEmail({}, { message: '邮箱 格式错误', groups: ['email'] })
    @IsNotEmpty({ message: '邮箱 必填', groups: ['email'] })
    @Column({ type: 'varchar', comment: '邮箱', nullable: true })
    email: string

    @IsNotEmpty({ message: '头像 必填', groups: ['avatar'] })
    @Column({ type: 'varchar', comment: '头像', nullable: true })
    avatar: string

    @IsMobile({ message: '手机号 格式错误', groups: ['mobile'] })
    @IsNotEmpty({ message: '手机号 必填', groups: ['mobile'] })
    @Column({ type: 'varchar', comment: '手机号', nullable: true })
    mobile: string

    @Length(6, 18, { message: '密码格式错误', groups: ['password'] })
    @IsNotEmpty({ message: '密码 必填', groups: ['password'] })
    @Column({
        type: 'varchar',
        comment: '密码',
        select: false,
        nullable: false
    })
    password: string
}
