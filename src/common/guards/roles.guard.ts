import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { HAS_PERMISSIONS_KEY } from '../decorators/has-permissions.decorator'
import { InjectModel } from '@nestjs/sequelize'
import { UserModel } from '../../modules/users/models/user.model'
import { RolesModel } from '../../modules/roles/models/roles.model'
import { PermissionsModel } from '../../modules/permissions/models/permissions.model'

/**
 * A guard that checks if a user has the required permissions to access a route.
 * It implements the CanActivate interface from the NestJS framework.
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        @InjectModel(UserModel) private repository: typeof UserModel
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>()
        const token = this.extractTokenFromHeader(request)
        if (!token) {
            throw new UnauthorizedException()
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: process.env.SECRET_KEY })
            request['user'] = payload
        } catch {
            throw new UnauthorizedException()
        }

        const requiredPermissions = this.reflector.get<string[]>(HAS_PERMISSIONS_KEY, context.getHandler())
        if (!requiredPermissions) {
            return true
        }

        const user = request['user']
        const userPermissions = await this.getUserPermissions(user.sub)

        const hasPermission = requiredPermissions.some((permission) => userPermissions.includes(permission))

        if (!hasPermission) {
            throw new NotFoundException('You do not have the required permissions to access this route')
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request?.headers?.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }

    private async getUserPermissions(userId: number): Promise<any> {
        try {
            const response = await this.repository.findOne({
                where: { id: userId },
                include: {
                    model: RolesModel,
                    include: [PermissionsModel]
                }
            })
            return response.role.permissions.map((permission) => permission.name)
        } catch (error) {
            throw new UnauthorizedException()
        }
    }
}
