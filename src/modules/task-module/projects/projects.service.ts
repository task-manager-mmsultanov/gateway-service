import { Inject, Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class ProjectsService implements OnModuleInit, OnApplicationShutdown {
    constructor(@Inject('PROJECT_SERVICE') private readonly kafkaClient: ClientKafka) {}

    async onApplicationShutdown() {
        await this.kafkaClient.close()
    }
    async onModuleInit() {
        const requestPatterns = [
            'projects.create_project',
            'projects.get_projects',
            'projects.get_project',
            'projects.update_project',
            'projects.delete_project'
        ]
        requestPatterns.forEach((pattern) => {
            this.kafkaClient.subscribeToResponseOf(pattern)
        })
        await this.kafkaClient.connect()
    }

    async create_project(payload: any): Promise<any> {
        return await lastValueFrom(this.kafkaClient.send('projects.create_project', payload))
    }

    async get_all(): Promise<any> {
        return await lastValueFrom(this.kafkaClient.send('projects.get_projects', {}))
    }

    async get_project(id: string): Promise<any> {
        return await lastValueFrom(this.kafkaClient.send('projects.get_project', { id }))
    }

    async update(id: string, payload: any): Promise<any> {
        return await lastValueFrom(this.kafkaClient.send('projects.update_project', { id, payload }))
    }

    async delete(id: string): Promise<any> {
        return await lastValueFrom(this.kafkaClient.send('projects.delete_project', { id }))
    }
}
