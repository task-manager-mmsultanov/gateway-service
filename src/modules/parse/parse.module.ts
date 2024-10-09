import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { RolesModel } from '../roles/models/roles.model'
import { PermissionsModel } from '../permissions/models/permissions.model'
import { UserModel } from '../users/models/user.model'
import { ParseController } from './parse.controller'
import { ParseService } from './parse.service'

@Module({
    imports: [SequelizeModule.forFeature([RolesModel, PermissionsModel, UserModel])],
    controllers: [ParseController],
    providers: [ParseService]
})
export class ParseModule {}
