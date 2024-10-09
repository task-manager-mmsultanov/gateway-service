import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class ResponseProjectCreateDTO {
    @ApiProperty({ example: 1, description: 'Project ID' })
    @IsNumber()
    id: number

    @ApiProperty({ example: 'Project Name', description: 'Project Name' })
    @IsString()
    name: string

    @ApiProperty({ example: 1, description: 'Creator ID' })
    @IsNumber()
    creator_id: number

    @ApiProperty({ example: [1, 2], description: 'Members IDs' })
    @IsNumber({}, { each: true })
    members: Array<number>

    constructor(data: { id: number; name: string; members: Array<number>; creator_id: number }) {
        this.id = data.id
        this.name = data.name
        this.creator_id = data.creator_id
        this.members = data.members
    }
}
