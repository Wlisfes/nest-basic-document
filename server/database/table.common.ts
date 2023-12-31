import { PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm'
import { moment } from '@/utils/utils-common'

export class TableCommon {
    @PrimaryGeneratedColumn({ comment: '自增长主键' })
    keyId: number

    @CreateDateColumn({
        comment: '创建时间',
        update: false,
        transformer: {
            from: value => moment(value).format('YYYY-MM-DD HH:mm:ss'),
            to: value => value
        }
    })
    createTime: Date

    @UpdateDateColumn({
        comment: '更新时间',
        transformer: {
            from: value => moment(value).format('YYYY-MM-DD HH:mm:ss'),
            to: value => value
        }
    })
    updateTime: Date
}
