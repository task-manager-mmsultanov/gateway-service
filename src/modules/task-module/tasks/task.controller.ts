import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { TaskService } from './task.service'
import { RequestCreateTaskDTO } from './dto/request-create-task.dto'
import { ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { ResponseCreateTaskDTO } from './dto/response-create-task.dto'
import { OneTaskFromListDTO } from './dto/one-task-from-list.dto'
import { AuthGuard } from 'src/modules/auth/guards/auth.guard'
import { PermissionsGuard } from 'src/common/guards/roles.guard'
import { HasPermissions } from 'src/common/decorators/has-permissions.decorator'

@ApiTags('Tasks')
@UseGuards(AuthGuard, PermissionsGuard)
@ApiSecurity('JWT-auth')
@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TaskService) {}

    /**
     * Creates a new task.
     *
     * @param payload - The payload containing the details of the task to be created.
     * @returns A promise that resolves to the response containing the created task.
     */
    @ApiResponse({ status: 201, description: 'Task created successfully', type: ResponseCreateTaskDTO })
    @ApiOperation({ summary: 'Create task' })
    @HasPermissions('task_create', 'task_all', 'super_admin_create', 'super_admin_all')
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create_task(@Body() payload: RequestCreateTaskDTO): Promise<ResponseCreateTaskDTO | HttpException> {
        const response = await this.taskService.create(payload)
        if (response instanceof HttpException) {
            return new HttpException(response.message, response.getStatus())
        }
        return new ResponseCreateTaskDTO(response)
    }

    /**
     * Retrieves all tasks from board.
     *
     * @param board_id - The unique identifier of the board.
     * @returns A promise that resolves to an array of tasks.
     */
    @ApiResponse({ status: 200, description: 'Tasks retrieved successfully', type: [OneTaskFromListDTO] })
    @ApiOperation({ summary: 'Get all tasks' })
    @HasPermissions('task_index', 'task_all', 'super_admin_index', 'super_admin_all')
    @HttpCode(HttpStatus.OK)
    @Get('all/:board_id')
    async get_tasks(@Param('board_id') board_id: number): Promise<Array<OneTaskFromListDTO>> {
        const response = await this.taskService.get_tasks_by_board_id(board_id)
        return response
    }

    /**
     * Retrieves a task by its unique identifier.
     *
     * @param task_id - The unique identifier of the task.
     * @returns A promise that resolves to the task.
     */
    @ApiResponse({ status: 200, description: 'Task retrieved successfully', type: OneTaskFromListDTO })
    @ApiOperation({ summary: 'Get task' })
    @HasPermissions('task_show', 'task_all', 'super_admin_show', 'super_admin_all')
    @HttpCode(HttpStatus.OK)
    @Get(':task_id')
    async get_task(@Param('task_id') task_id: number): Promise<OneTaskFromListDTO> {
        const response = await this.taskService.get_by_id(task_id)
        return response
    }

    /**
     * Updates a task by its unique identifier.
     *
     * @param task_id - The unique identifier of the task.
     * @param payload - The payload containing the details of the task to be updated.
     * @returns A promise that resolves to the updated task.
     */
    @ApiResponse({ status: 200, description: 'Task updated successfully', type: OneTaskFromListDTO })
    @ApiOperation({ summary: 'Update task' })
    @HasPermissions('task_update', 'task_all', 'super_admin_update', 'super_admin_all')
    @ApiBody({ type: RequestCreateTaskDTO })
    @HttpCode(HttpStatus.OK)
    @Patch(':task_id')
    async update_task(@Param('task_id') task_id: number, @Body() payload: Partial<RequestCreateTaskDTO>): Promise<OneTaskFromListDTO> {
        const response = await this.taskService.update(task_id, payload)
        return response
    }

    /**
     * Deletes a task by its unique identifier.
     *
     * @param task_id - The unique identifier of the task.
     * @returns A promise that resolves to void.
     */
    @ApiResponse({ status: 204, description: 'Task deleted successfully' })
    @ApiOperation({ summary: 'Delete task' })
    @HasPermissions('task_delete', 'task_all', 'super_admin_delete', 'super_admin_all')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':task_id')
    async delete_task(@Param('task_id') task_id: number): Promise<void> {
        return this.taskService.delete(task_id)
    }
}
