import { HttpException } from '@nestjs/common'

// make custom type for error
export class CustomError {
    statusCode: number // Declare the statusCode property
    message: string // Declare the message property

    constructor({ statusCode, message }: { statusCode: number; message: string }) {
        this.statusCode = statusCode
        this.message = message
    }
}
