import { ApiProperty } from '@nestjs/swagger'
import type { UserModel } from '../models/user.model'

export class ResponseOneUserDTO {
    @ApiProperty({
        example: 1,
        description: 'The ID of the user.'
    })
    id: number
    @ApiProperty({
        example: 'John',
        description: 'The first name of the user.'
    })
    first_name: string
    @ApiProperty({
        example: 'Doe',
        description: 'The last name of the user.'
    })
    last_name: string
    @ApiProperty({
        example: 'test@example.com',
        description: 'The email of the user.'
    })
    email: string
    @ApiProperty({
        example: 1,
        description: 'The ID of the role of the user.'
    })
    role_id: number
    @ApiProperty({
        example: null,
        description: 'The date the user was deleted.'
    })
    deleted_at: Date | null
    @ApiProperty({
        example: true,
        description: 'Whether the user is active.'
    })
    is_active: boolean
    @ApiProperty({
        example: false,
        description: 'Whether the user is deleted.'
    })
    is_deleted: boolean
    @ApiProperty({
        example: '2022-01-01T00:00:00.000Z',
        description: 'The date the user was created.'
    })
    created_at: Date
    @ApiProperty({
        example: '2022-01-01T00:00:00.000Z',
        description: 'The date the user was last updated.'
    })
    updated_at: Date

    constructor(data: {
        id: number
        first_name: string
        last_name: string
        email: string
        role_id: number
        deleted_at: Date | null
        is_active: boolean
        is_deleted: boolean
        created_at: Date
        updated_at: Date
    }) {
        this.id = data.id
        this.first_name = data.first_name
        this.last_name = data.last_name
        this.email = data.email
        this.role_id = data.role_id
        this.deleted_at = data.deleted_at
        this.is_active = data.is_active
        this.is_deleted = data.is_deleted
        this.created_at = data.created_at
        this.updated_at = data.updated_at
    }
}
