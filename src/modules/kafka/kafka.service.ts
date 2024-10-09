import { Injectable } from '@nestjs/common'
import { Kafka } from 'kafkajs'
@Injectable()
export class KafkaService {
    private kafka: Kafka
    constructor() {
        this.kafka = new Kafka({
            clientId: 'task-service',
            brokers: ['localhost:9092']
        })
    }
    async sendMessage(topic: string, message: string) {
        const producer = this.kafka.producer()
        await producer.connect()
        await producer.send({
            topic,
            messages: [{ value: message }]
        })
        await producer.disconnect()
    }
    async consumeMessages(topic: string) {
        const consumer = this.kafka.consumer({ groupId: 'task-consumer' })
        await consumer.connect()
        await consumer.subscribe({ topic, fromBeginning: true })
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                // Handle the received message
                console.log({
                    topic,
                    partition,
                    value: message.value.toString()
                })
            }
        })
    }
}
