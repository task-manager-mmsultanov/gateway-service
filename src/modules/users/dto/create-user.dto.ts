import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, Length, IsString } from 'class-validator'

export class CreateUserDTO {
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
}
