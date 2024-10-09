import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { ColumnsService } from './columns.service'
import { ResponseCreateColumnDTO } from './dto/response-create-column.dto'
import { RequestCreateColumnDTO } from './dto/request-create-column.dto'
import { ResponseColumnsListDTO } from './dto/response-columns-list.dto'
import { RequestPatchColumnDTO } from './dto/request-patch-column.dto'
import { HasPermissions } from 'src/common/decorators/has-permissions.decorator'
import { PermissionsGuard } from 'src/common/guards/roles.guard'
import { AuthGuard } from 'src/modules/auth/guards/auth.guard'

@ApiTags('Columns')
@UseGuards(AuthGuard, PermissionsGuard)
@ApiSecurity('JWT-auth')
@Controller('columns')
export class ColumnsController {
    constructor(private readonly column_service: ColumnsService) {}

    /**
     * Creates a new column.
     *
     * @param payload - The payload containing the data for the new column.
     * @returns A promise that resolves to the response containing the created column.
     */
    @ApiResponse({ status: 201, description: 'Column created successfully', type: ResponseCreateColumnDTO })
    @ApiOperation({ summary: 'Create a new column' })
    @ApiBody({ type: RequestCreateColumnDTO })
    @HttpCode(HttpStatus.CREATED)
    @HasPermissions('column_create', 'column_all', 'super_admin_create', 'super_admin_all')
    @Post()
    async create_column(@Body() payload: RequestCreateColumnDTO): Promise<ResponseCreateColumnDTO> {
        const response = await this.column_service.create(payload)
        return response
    }

    /**
     * Retrieves the columns for a given board.
     *
     * @param board_id - The ID of the board.
     * @returns A promise that resolves to an array of ResponseColumnsListDTO objects representing the columns.
     */
    @ApiResponse({ status: 200, description: 'Columns retrieved successfully', type: [ResponseColumnsListDTO] })
    @ApiParam({ name: 'board_id', description: 'The ID of the board to get columns for', type: 'integer' })
    @ApiOperation({ summary: 'Get columns by board ID' })
    @HttpCode(HttpStatus.OK)
    @HasPermissions('column_index', 'column_all', 'super_admin_index', 'super_admin_all')
    @Get('board/:board_id')
    async get_columns(@Param('board_id') board_id: number): Promise<Array<ResponseColumnsListDTO>> {
        const response = await this.column_service.get_columns_by_id(board_id)
        return response
    }

    // /**
    //  * Retrieves a column by its ID.
    //  *
    //  * @param id - The ID of the column.
    //  * @returns A promise that resolves to a ResponseColumnsListDTO object if successful, or an HttpException object if an error occurs.
    //  */
    @ApiResponse({ status: 200, description: 'Column retrieved successfully', type: ResponseColumnsListDTO })
    @ApiParam({ name: 'id', description: 'The ID of the column to get', type: 'integer' })
    @ApiOperation({ summary: 'Get a column by ID' })
    @HttpCode(HttpStatus.OK)
    @HasPermissions('column_show', 'column_all', 'super_admin_show', 'super_admin_all')
    @Get(':id')
    async get_column(@Param('id') id: number): Promise<ResponseColumnsListDTO | HttpException> {
        const response = await this.column_service.get_column_by_id(id)
        if (response instanceof HttpException) {
            return new HttpException(response.message, response.getStatus())
        }
        return response
    }

    // /**
    //  * Updates a column.
    //  *
    //  * @param id - The ID of the column.
    //  * @param payload - The payload containing the updated column data.
    //  * @returns A promise that resolves to the updated column data or an HttpException if an error occurs.
    //  */
    @ApiResponse({ status: 200, description: 'Column updated successfully', type: ResponseColumnsListDTO })
    @ApiParam({ name: 'id', description: 'The ID of the column to update', type: 'integer' })
    @ApiOperation({ summary: 'Update a column by ID' })
    @ApiBody({ type: RequestPatchColumnDTO })
    @HttpCode(HttpStatus.OK)
    @HasPermissions('column_update', 'column_all', 'super_admin_update', 'super_admin_all')
    @Patch(':id')
    async update_column(@Param('id') id: number, @Body() payload: RequestPatchColumnDTO): Promise<ResponseColumnsListDTO | HttpException> {
        const response = await this.column_service.update_column(id, payload)
        if (response instanceof HttpException) {
            return new HttpException(response.message, response.getStatus())
        }
        return new ResponseColumnsListDTO(response)
    }

    // /**
    //  * Deletes a column by its ID.
    //  *
    //  * @param id - The ID of the column to delete.
    //  * @returns A promise that resolves when the column is successfully deleted.
    //  */
    @ApiResponse({ status: 204, description: 'Column deleted successfully' })
    @ApiParam({ name: 'id', description: 'The ID of the column to delete', type: 'integer' })
    @ApiOperation({ summary: 'Delete a column by ID' })
    @HasPermissions('column_delete', 'column_all', 'super_admin_delete', 'super_admin_all')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async delete_column(@Param('id') id: number): Promise<void> {
        await this.column_service.delete_column(id)
    }
}
