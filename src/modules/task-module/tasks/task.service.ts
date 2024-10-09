import { HttpException, Inject, Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'
import { RequestCreateTaskInterface } from './interface/request-create-task.interface'
import { UsersService } from 'src/modules/users/users.service'

@Injectable()
export class TaskService implements OnModuleInit, OnApplicationShutdown {
    constructor(
        @Inject('TASK_SERVICE') private readonly kafkaClient: ClientKafka,
        private readonly userService: UsersService
    ) {}

    async onApplicationShutdown() {
        await this.kafkaClient.close()
    }
    async onModuleInit() {
        const requestPatterns = ['task.create', 'task.get_tasks_by_board_id', 'task.get_by_id', 'task.update', 'task.delete']
        requestPatterns.forEach((pattern) => {
            this.kafkaClient.subscribeToResponseOf(pattern)
        })
        await this.kafkaClient.connect()
    }

    private async check_assignee_exists(assignee_id: number): Promise<boolean | HttpException> {
        const user = await this.userService.get_by_id(assignee_id)
        if (!user) {
            throw new HttpException('Assignee not found', 404)
        }
        return true
    }

    async create(payload: RequestCreateTaskInterface): Promise<any | HttpException> {
        await this.check_assignee_exists(payload.assignee_id)
        return await lastValueFrom(this.kafkaClient.send('task.create', payload))
    }

    async get_tasks_by_board_id(board_id: number): Promise<any> {
        return await lastValueFrom(this.kafkaClient.send('task.get_tasks_by_board_id', { board_id }))
    }

    async get_by_id(id: number): Promise<any> {
        return await lastValueFrom(this.kafkaClient.send('task.get_by_id', id))
    }

    async update(id: number, payload: any): Promise<any> {
        return await lastValueFrom(this.kafkaClient.send('task.update', { id, payload }))
    }

    async delete(id: number): Promise<any> {
        return await lastValueFrom(this.kafkaClient.send('task.delete', id))
    }
}
