import { Entity, Column } from 'typeorm'
import { IsNotEmpty, Length, IsEmail } from 'class-validator'
import { IsMobile } from '@/server/utils/utils-decorator'
import { TableCommon } from '~/server/database/table.common'
import bcrypt from 'bcryptjs'

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

    @IsNotEmpty({ message: '状态 必填' })
    @Column({
        type: 'varchar',
        comment: '状态: 禁用-disable、启用-enable、删除-delete',
        default: 'enable',
        nullable: false
    })
    status: string

    @Length(6, 18, { message: '密码格式错误', groups: ['password'] })
    @IsNotEmpty({ message: '密码 必填', groups: ['password'] })
    @Column({
        type: 'varchar',
        comment: '密码',
        select: false,
        nullable: false,
        transformer: { from: value => value, to: value => bcrypt.hashSync(value) }
    })
    password: string
}

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
