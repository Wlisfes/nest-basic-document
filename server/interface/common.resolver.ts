import { IsNumber, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class ColumnSchema {
    @IsOptional({ groups: ['size'] })
    @IsNumber({}, { message: 'page必须是数字', groups: ['size'] })
    @Min(1, { message: 'page必须大于0', groups: ['size'] })
    @Type(type => Number)
    page: number

    @IsOptional({ groups: ['size'] })
    @IsNumber({}, { message: 'size必须是数字', groups: ['size'] })
    @Min(1, { message: 'size必须大于0', groups: ['size'] })
    @Type(type => Number)
    size: number
}
