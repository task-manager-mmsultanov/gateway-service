import { Module } from '@nestjs/common'
import { KafkaModule } from '../../kafka/kafka.module'
import { ProjectsController } from './projects.controller'
import { ProjectsService } from './projects.service'
import { UsersModule } from '../../users/users.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModel } from '../../users/models/user.model'

@Module({
    imports: [SequelizeModule.forFeature([UserModel]), UsersModule, KafkaModule],
    controllers: [ProjectsController],
    providers: [ProjectsService]
})
export class ProjectsModule {}
