import { HttpException, Injectable, Res, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { UsersService } from '../users/users.service'
import { ResponseUserLoginInterface } from './interface/response-user-login.interface'
import { RegisterUserDTO } from './dto/register-user.dto'
import { CustomError } from 'src/common/types/custom-error'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async sign_in(email: string, password: string): Promise<ResponseUserLoginInterface | CustomError> {
        const user = await this.usersService.findOne(email)
        if (!user) {
            return new CustomError({ statusCode: 401, message: 'Invalid credentials' })
        }
        const isMatch = await bcrypt.compare(password, user.dataValues.password)

        if (!isMatch) {
            return new CustomError({ statusCode: 401, message: 'Invalid credentials' })
        }
        const payload = { sub: user.id, username: user.first_name, role: user.role.slug }
        const { password: _, ...result } = user
        return { ...result.dataValues, access_token: this.jwtService.sign(payload) }
    }

    async sign_up(RegisterUserDTO: RegisterUserDTO): Promise<any> {
        try {
            const user = await this.usersService.register(RegisterUserDTO)
            const auth = await this.sign_in(user.email, RegisterUserDTO.password)
            return auth
        } catch (error) {
            return new CustomError({ statusCode: 400, message: error.message })
        }
    }
}
