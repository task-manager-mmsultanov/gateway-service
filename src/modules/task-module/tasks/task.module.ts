import { Module } from '@nestjs/common'
import { KafkaModule } from 'src/modules/kafka/kafka.module'
import { UsersModule } from 'src/modules/users/users.module'
import { TasksController } from './task.controller'
import { TaskService } from './task.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModel } from 'src/modules/users/models/user.model'

@Module({
    imports: [SequelizeModule.forFeature([UserModel]), UsersModule, KafkaModule],
    controllers: [TasksController],
    providers: [TaskService]
})
export class TaskModule {}
