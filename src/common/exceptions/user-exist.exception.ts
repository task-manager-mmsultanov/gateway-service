import { HttpException } from '@nestjs/common'

export class UserExistsException extends HttpException {
    constructor() {
        super('User already exists', 400)
    }
}
