import { Entity, Column } from 'typeorm'
import { IsNotEmpty, Length, IsEmail } from 'class-validator'
import { TableCommon } from '@/server/typeorm/entity/table.common'

@Entity('table_user')
export class TableUser extends TableCommon {
    @IsNotEmpty({ message: 'UID 必填' })
    @Column({ type: 'varchar', comment: 'uid', update: false, nullable: false })
    uid: string

    @IsNotEmpty({ message: '用户昵称 必填' })
    @Column({ type: 'varchar', comment: '昵称', nullable: false })
    nickname: string

    @IsNotEmpty({ message: '邮箱 必填' })
    @IsEmail({}, { message: '邮箱 格式错误' })
    @Column({ type: 'varchar', comment: '邮箱', nullable: true })
    email: string

    @Column({ type: 'varchar', comment: '头像', nullable: true })
    @IsNotEmpty({ message: '头像 必填' })
    avatar: string

    @Column({ type: 'varchar', comment: '手机号', nullable: false })
    mobile: string

    @IsNotEmpty({ message: '密码 必填' })
    @Length(6, 18, { message: '密码格式错误' })
    @Column({
        type: 'varchar',
        comment: '密码',
        select: false,
        nullable: false
    })
    password: string

    setUid(uid: string) {
        this.uid = uid
    }
}
