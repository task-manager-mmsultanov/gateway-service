import { Inject, Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class ColumnsService implements OnModuleInit, OnApplicationShutdown {
    constructor(@Inject('COLUMN_SERVICE') private readonly kafkaClient: ClientKafka) {}

    async onApplicationShutdown() {
        await this.kafkaClient.close()
    }
    async onModuleInit() {
        const requestPatterns = ['columns.create', 'columns.get_columns_by_id', 'columns.get_column_by_id', 'columns.update_column', 'columns.delete_column']
        requestPatterns.forEach((pattern) => {
            this.kafkaClient.subscribeToResponseOf(pattern)
        })
        await this.kafkaClient.connect()
    }

    async create(payload: any): Promise<any> {
        return await lastValueFrom(this.kafkaClient.send('columns.create', payload))
    }

    async get_columns_by_id(board_id: number): Promise<any> {
        return await lastValueFrom(this.kafkaClient.send('columns.get_columns_by_id', { board_id }))
    }

    async get_column_by_id(id: number): Promise<any> {
        return await lastValueFrom(this.kafkaClient.send('columns.get_column_by_id', { id }))
    }

    async update_column(id: number, payload: any): Promise<any> {
        return await lastValueFrom(this.kafkaClient.send('columns.update_column', { id, payload }))
    }

    async delete_column(id: number): Promise<any> {
        return await lastValueFrom(this.kafkaClient.send('columns.delete_column', { id }))
    }
}
