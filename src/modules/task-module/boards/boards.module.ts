import { Module } from '@nestjs/common'
import { BoardService } from './boards.service'
import { BoardController } from './boards.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { KafkaModule } from 'src/modules/kafka/kafka.module'
import { UserModel } from 'src/modules/users/models/user.model'

@Module({
    imports: [SequelizeModule.forFeature([UserModel]), KafkaModule],
    controllers: [BoardController],
    providers: [BoardService],
    exports: [BoardService]
})
export class BoardsModule {}
