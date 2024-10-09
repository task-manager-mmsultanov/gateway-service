import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'PROJECT_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: ['localhost:9092']
                    },
                    consumer: {
                        groupId: 'project-consumer',
                        sessionTimeout: 6000, // Можно попробовать уменьшить до 10 секунд
                        heartbeatInterval: 2000 // Отправка heartbeat чаще, например каждые 3 секунды
                    }
                }
            },
            {
                name: 'BOARD_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: ['localhost:9092']
                    },
                    consumer: {
                        groupId: 'board-consumer',
                        sessionTimeout: 6000, // Можно попробовать уменьшить до 10 секунд
                        heartbeatInterval: 2000 // Отправка heartbeat чаще, например каждые 3 секунды
                    }
                }
            },
            {
                name: 'COLUMN_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: ['localhost:9092']
                    },
                    consumer: {
                        groupId: 'column-consumer',
                        sessionTimeout: 6000, // Можно попробовать уменьшить до 10 секунд
                        heartbeatInterval: 2000 // Отправка heartbeat чаще, например каждые 3 секунды
                    }
                }
            },
            {
                name: 'TASK_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: ['localhost:9092']
                    },
                    consumer: {
                        groupId: 'task-consumer',
                        sessionTimeout: 6000, // Можно попробовать уменьшить до 10 секунд
                        heartbeatInterval: 2000 // Отправка heartbeat чаще, например каждые 3 секунды
                    }
                }
            }
        ])
    ],
    controllers: [],
    providers: [],
    exports: [ClientsModule]
})
export class KafkaModule {}
