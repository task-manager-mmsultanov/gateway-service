import { HttpException, Inject, Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'
import { RequestCreateBoardInterface } from './interface/request-create-board.interface'
import { ResponseCreateBoardInterface } from './interface/response-create-board.interface'
import { OneBoardFromListInterface } from './interface/one-board-from-list.interface'

@Injectable()
export class BoardService implements OnModuleInit, OnApplicationShutdown {
    constructor(@Inject('BOARD_SERVICE') private readonly kafkaClient: ClientKafka) {}

    async onApplicationShutdown() {
        await this.kafkaClient.close()
    }
    async onModuleInit() {
        const requestPatterns = ['boards.create_board', 'boards.get_all_boards', 'boards.get_board_by_id', 'boards.update_board', 'boards.delete_board']
        requestPatterns.forEach((pattern) => {
            this.kafkaClient.subscribeToResponseOf(pattern)
        })
        await this.kafkaClient.connect()
    }

    /**
     * Creates a new board.
     *
     * @param payload - The payload containing the data for the new board.
     * @returns A promise that resolves to the created board.
     * @throws If an error occurs during the creation process.
     */
    async create(payload: RequestCreateBoardInterface): Promise<ResponseCreateBoardInterface> {
        return await lastValueFrom(this.kafkaClient.send('boards.create_board', payload))
    }

    /**
     * Retrieves a list of boards along with their columns.
     * @returns A promise that resolves to an array of OneBoardFromListInterface.
     */
    async list(): Promise<Array<OneBoardFromListInterface>> {
        return await lastValueFrom(this.kafkaClient.send('boards.get_all_boards', {}))
    }

    /**
     * Retrieves a board by its ID.
     *
     * @param id - The ID of the board to retrieve.
     * @returns A promise that resolves to the retrieved board or an HttpException if the board is not found or an error occurs.
     */
    async get_by_id(id: number): Promise<OneBoardFromListInterface | HttpException> {
        return await lastValueFrom(this.kafkaClient.send('boards.get_board_by_id', { id }))
    }

    /**
     * Updates a board with the specified ID.
     *
     * @param id - The ID of the board to update.
     * @param payload - The payload containing the new name and project ID.
     * @returns A promise that resolves to a string indicating the success of the update or an HttpException if an error occurs.
     */
    async patch(id: number, payload: { name: string; projectId: number }): Promise<string | HttpException> {
        return await lastValueFrom(this.kafkaClient.send('boards.update_board', { id, payload }))
    }

    /**
     * Deletes a board by its ID.
     *
     * @param id - The ID of the board to delete.
     * @returns A promise that resolves to a string indicating the result of the deletion or an HttpException if the board is not found.
     */
    async delete(id: number): Promise<string | HttpException> {
        return await lastValueFrom(this.kafkaClient.send('boards.delete_board', { id }))
    }
}
