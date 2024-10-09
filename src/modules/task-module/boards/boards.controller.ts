import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { BoardService } from './boards.service'
import { RequestCreateBoardDTO } from './dto/request-create-board.dto'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { ResponseCreateBoardDTO } from './dto/response-create-board.dto'
import { OneBoardFromListDTO } from './dto/one-board-from-list.dto'
import { AuthGuard } from 'src/modules/auth/guards/auth.guard'
import { PermissionsGuard } from 'src/common/guards/roles.guard'
import { HasPermissions } from 'src/common/decorators/has-permissions.decorator'

@ApiTags('boards')
@UseGuards(AuthGuard, PermissionsGuard)
@ApiSecurity('JWT-auth')
@Controller('boards')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    /**
     * Creates a new board.
     *
     * @param payload - The payload containing the information for creating the board.
     * @returns A promise that resolves to the response containing the created board.
     */
    @ApiBody({ type: RequestCreateBoardDTO })
    @ApiResponse({ status: 201, description: 'Board created', type: ResponseCreateBoardDTO })
    @ApiOperation({ summary: 'Create board', operationId: 'createBoard' })
    @ApiBody({ type: RequestCreateBoardDTO })
    @HttpCode(HttpStatus.CREATED)
    @HasPermissions('board_create', 'board_all', 'super_admin_create', 'super_admin_all')
    @Post()
    async create_board(@Body() payload: RequestCreateBoardDTO): Promise<ResponseCreateBoardDTO> {
        const response = await this.boardService.create(payload)
        return response
    }

    /**
     * Retrieves all boards.
     * @returns A promise that resolves to an array of OneBoardFromListDTO objects.
     */
    @ApiResponse({ status: 200, description: 'List of boards', type: [OneBoardFromListDTO] })
    @ApiOperation({ summary: 'List of boards', operationId: 'listBoards' })
    @HttpCode(HttpStatus.OK)
    @HasPermissions('board_index', 'board_all', 'super_admin_index', 'super_admin_all')
    @Get()
    async get_all_boards(): Promise<Array<OneBoardFromListDTO>> {
        const response = await this.boardService.list()
        return response
    }

    /**
     * Retrieves a board by its ID.
     *
     * @param id - The ID of the board to retrieve.
     * @returns A Promise that resolves to a OneBoardFromListDTO representing the retrieved board.
     */
    @ApiResponse({ status: 200, description: 'Board by id', type: OneBoardFromListDTO })
    @ApiOperation({ summary: 'Get board by id', operationId: 'getBoardById' })
    @ApiParam({ name: 'id', type: 'integer', required: true })
    @HttpCode(HttpStatus.OK)
    @HasPermissions('board_show', 'board_all', 'super_admin_show', 'super_admin_all')
    @Get(':id')
    async get_board_by_id(@Param('id') id: number): Promise<OneBoardFromListDTO | HttpException> {
        const response = await this.boardService.get_by_id(id)
        if (response instanceof HttpException) {
            return new HttpException(response.message, response.getStatus())
        }
        return response
    }

    /**
     * Updates a board.
     *
     * @param id - The ID of the board to update.
     * @param payload - The payload containing the updated board information.
     * @returns A promise that resolves to a string or an HttpException.
     */
    @ApiOperation({ summary: 'Update board', operationId: 'updateBoard' })
    @ApiResponse({ status: 200, description: 'Board updated' })
    @ApiParam({ name: 'id', type: 'integer', required: true })
    @ApiBody({ type: RequestCreateBoardDTO })
    @HttpCode(HttpStatus.OK)
    @HasPermissions('board_update', 'board_all', 'super_admin_update', 'super_admin_all')
    @Patch(':id')
    async update_board(@Param('id') id: number, @Body() payload: { name: string; projectId: number }): Promise<string | HttpException> {
        const response = this.boardService.patch(id, payload)
        if (response instanceof HttpException) {
            return new HttpException(response.message, response.getStatus())
        }
        return response
    }

    /**
     * Deletes a board.
     *
     * @param id - The ID of the board to delete.
     * @returns A promise that resolves to a string or an HttpException.
     */
    @ApiOperation({ summary: 'Delete board', operationId: 'deleteBoard' })
    @ApiResponse({ status: 200, description: 'Board deleted' })
    @ApiParam({ name: 'id', type: 'integer', required: true })
    @HttpCode(HttpStatus.NO_CONTENT)
    @HasPermissions('board_delete', 'board_all', 'super_admin_delete', 'super_admin_all')
    @Delete(':id')
    async delete_board(@Param('id') id: number): Promise<string | HttpException> {
        const response = this.boardService.delete(id)
        if (response instanceof HttpException) {
            return new HttpException(response.message, response.getStatus())
        }
        return response
    }
}
