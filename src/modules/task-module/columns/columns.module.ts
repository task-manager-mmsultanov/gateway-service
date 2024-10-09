import { Module } from '@nestjs/common'
import { ColumnsController } from './columns.controller'
import { ColumnsService } from './columns.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModel } from 'src/modules/users/models/user.model'
import { KafkaModule } from 'src/modules/kafka/kafka.module'

@Module({
    imports: [SequelizeModule.forFeature([UserModel]), KafkaModule],
    controllers: [ColumnsController],
    providers: [ColumnsService],
    exports: [ColumnsService]
})
export class ColumnsModule {}
