import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

/**
 * Represents the response data for a created user.
 */
export class ResponseCreatedUserDTO {
    @ApiProperty({
        example: 'John',
        description: 'The first name of the user.'
    })
    @Expose()
    first_name: string
    @ApiProperty({
        example: 'Doe',
        description: 'The last name of the user.'
    })
    @Expose()
    last_name: string
    @ApiProperty({
        example: 'test@example.com',
        description: 'The email of the user.'
    })
    @Expose()
    email: string

    constructor(data: { first_name: string; last_name: string; email: string }) {
        this.first_name = data.first_name
        this.last_name = data.last_name
        this.email = data.email
    }
}
