import { ApiProperty } from '@nestjs/swagger'

export class LoggedUserRoleDTO {
    @ApiProperty({
        example: 'Admin',
        description: 'The name of the role.'
    })
    name: string
    @ApiProperty({
        example: 'admin',
        description: 'The slug of the role.'
    })
    slug: string

    constructor(role: { name: string; slug: string }) {
        this.name = role.name
        this.slug = role.slug
    }
}
