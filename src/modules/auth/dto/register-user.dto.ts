import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class RegisterUserDTO {
    @ApiProperty({
        example: 'John',
        description: 'The first name of the user.'
    })
    @IsNotEmpty({ message: 'Please Enter Full Name' })
    @IsString({ message: 'Please Enter Valid Name' })
    first_name: string

    @ApiProperty({
        example: 'Doe',
        description: 'The last name of the user.'
    })
    @IsNotEmpty({ message: 'Please Enter Full Name' })
    @IsString({ message: 'Please Enter Valid Name' })
    last_name: string

    @ApiProperty({
        example: 'test@example.com',
        description: 'The email of the user.'
    })
    @IsEmail()
    email: string

    @ApiProperty({
        example: 'password',
        description: 'The password of the user.'
    })
    @IsNotEmpty({ message: 'Please Enter Password' })
    password: string

    constructor(data: { first_name: string; last_name: string; email: string; password: string }) {
        this.first_name = data.first_name
        this.last_name = data.last_name
        this.email = data.email
        this.password = data.password
    }

    toString() {
        return JSON.stringify({
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password
        })
    }
}
