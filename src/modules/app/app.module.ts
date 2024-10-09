import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from '../users/users.module'
import { PermissionsModule } from '../permissions/permissions.module'
import { RolesModule } from '../roles/roles.module'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModel } from '../users/models/user.model'
import { PermissionsModel } from '../permissions/models/permissions.model'
import { RolesModel } from '../roles/models/roles.model'
import { RolePermissionsModel } from '../permissions/models/role-permissions.model'
import { AuthModule } from '../auth/auth.module'
import { ParseModule } from '../parse/parse.module'
import { ProjectsModule } from '../task-module/projects/projects.module'
import { BoardsModule } from '../task-module/boards/boards.module'
import { ColumnsModule } from '../task-module/columns/columns.module'
import { TaskModule } from '../task-module/tasks/task.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        SequelizeModule.forRootAsync({
            useFactory: () => ({
                dialect: 'postgres',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                autoLoadModels: true,
                synchronize: true,
                models: [UserModel, PermissionsModel, RolesModel, RolePermissionsModel]
            })
        }),
        ParseModule,
        AuthModule,
        UsersModule,
        PermissionsModule,
        RolesModule,
        ProjectsModule,
        BoardsModule,
        ColumnsModule,
        TaskModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
