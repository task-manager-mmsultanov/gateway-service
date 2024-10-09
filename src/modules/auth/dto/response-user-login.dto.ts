import { ApiProperty } from '@nestjs/swagger'
import { LoggedUserRoleDTO } from './role.dto'

export class ResponseUserLoginDTO {
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
        example: 'eyJhbGcidwqiodjqowimzxcmoizxjc8932jf32nczkjcn',
        description: 'The access token of the user.'
    })
    access_token: string

    constructor(user: { first_name: string; last_name: string; email: string; access_token: string }) {
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.email = user.email
        this.access_token = user.access_token
    }

    toString() {
        return JSON.stringify({
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            access_token: this.access_token
        })
    }
}
