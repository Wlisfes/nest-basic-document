import { PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm'
import * as day from 'dayjs'

export class TableCommon {
    @PrimaryGeneratedColumn({ comment: '自增长主键' })
    keyId!: number

    @CreateDateColumn({
        comment: '创建时间',
        update: false
        // transformer: {
        //     from: value => day(value).format('YYYY-MM-DD HH:mm:ss'),
        //     to: value => value
        // }
    })
    createTime!: Date

    @UpdateDateColumn({
        comment: '更新时间'
        // transformer: {
        //     from: value => day(value).format('YYYY-MM-DD HH:mm:ss'),
        //     to: value => value
        // }
    })
    updateTime!: Date
}
