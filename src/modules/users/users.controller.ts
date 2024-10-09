import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { ResponseCreatedUserDTO } from './dto/response-created-user.dto'
import { ResponseAllUsersDTO } from './dto/response-all-users.dto'
import { ResponseOneUserDTO } from './dto/response-one-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'
import { AuthGuard } from '../auth/guards/auth.guard'
import { HasPermissions } from 'src/common/decorators/has-permissions.decorator'
import { PermissionsGuard } from 'src/common/guards/roles.guard'
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger'

@UseGuards(AuthGuard, PermissionsGuard)
@ApiTags('Users')
@ApiSecurity('JWT-auth')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    /**
     * Creates a new user.
     *
     * @param createUserDTO - The data for creating the user.
     * @returns A Promise that resolves to the created user.
     */
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: HttpStatus.CREATED, type: ResponseCreatedUserDTO, description: 'The created user' })
    @HasPermissions('user_create', 'user_all', 'super_admin_create', 'super_admin_all')
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() createUserDTO: CreateUserDTO): Promise<ResponseCreatedUserDTO> {
        const result = await this.userService.create(createUserDTO)
        return new ResponseCreatedUserDTO(result)
    }

    /**
     * Retrieves all users.
     *
     * @returns A promise that resolves to an array of ResponseAllUsersDTO objects.
     */
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: HttpStatus.OK, type: [ResponseAllUsersDTO], description: 'All users' })
    @HasPermissions('user_index', 'user_all', 'super_admin_index', 'super_admin_all')
    @HttpCode(HttpStatus.OK)
    @Get()
    async get_all_users(): Promise<Array<ResponseAllUsersDTO>> {
        const result = await this.userService.get_all()
        return new Array<ResponseAllUsersDTO>(...result)
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param id - The ID of the user.
     * @returns A Promise that resolves to a ResponseOneUserDTO object representing the user.
     */
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiResponse({ status: HttpStatus.OK, type: ResponseOneUserDTO, description: 'The user with the specified ID' })
    @HasPermissions('user_show', 'user_all', 'super_admin_show', 'super_admin_all')
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async get_user_by_id(@Param('id') id: number): Promise<ResponseOneUserDTO> {
        return this.userService.get_by_id(id)
    }

    /**
     * Updates a user.
     *
     * @param id - The ID of the user to update.
     * @param updateUserDTO - The data to update the user with.
     * @returns A promise that resolves to the updated user.
     */
    @ApiOperation({ summary: 'Update a user' })
    @ApiResponse({ status: HttpStatus.OK, type: ResponseOneUserDTO, description: 'The updated user' })
    @HasPermissions('user_update', 'user_all', 'super_admin_update', 'super_admin_all')
    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    async update_user(@Param('id') id: number, @Body() updateUserDTO: Partial<UpdateUserDTO>): Promise<ResponseOneUserDTO> {
        const result = await this.userService.update(id, updateUserDTO)
        return new ResponseOneUserDTO(result)
    }

    /**
     * Deletes a user by their ID.
     *
     * @param id - The ID of the user to delete.
     * @returns A promise that resolves to void.
     */
    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'User deleted successfully' })
    @HasPermissions('user_delete', 'user_all', 'super_admin_delete', 'super_admin_all')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async delete_user(@Param('id') id: number): Promise<void> {
        return this.userService.delete(id)
    }
}
