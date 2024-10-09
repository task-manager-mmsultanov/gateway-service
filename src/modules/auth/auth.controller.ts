import { Controller, HttpException, HttpStatus, Post, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ResponseUserLoginDTO } from './dto/response-user-login.dto'
import { CreateUserDTO } from '../users/dto/create-user.dto'
import { ApiTags } from '@nestjs/swagger'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { SignInDTO } from './dto/sign-in.dto'
import { RegisterUserDTO } from './dto/register-user.dto'
import { CustomError } from 'src/common/types/custom-error'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Signs in a user.
     *
     * @param {SignInDTO} SignInDTO - The sign-in data.
     * @returns {Promise<any>} - A promise that resolves with the result of the sign-in operation.
     */
    @Post('login')
    async Login(@Payload() SignInDTO: SignInDTO): Promise<ResponseUserLoginDTO | CustomError> {
        const response = await this.authService.sign_in(SignInDTO.email, SignInDTO.password)
        if (response instanceof CustomError) {
            return {
                statusCode: HttpStatus.UNAUTHORIZED,
                message: response.message
            }
        }
        return new ResponseUserLoginDTO(response)
    }

    /**
     * Signs up a user.
     *
     * @param {CreateUserDTO} signUpDTO - The sign-up data.
     * @returns {Promise<any>} - A promise that resolves with the result of the sign-up operation.
     */
    @Post('register')
    async Register(@Payload() signUpDTO: CreateUserDTO): Promise<RegisterUserDTO | CustomError> {
        const response = await this.authService.sign_up(signUpDTO)
        if (response instanceof CustomError) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: response.message
            }
        }
        return new RegisterUserDTO(response)
    }
}
