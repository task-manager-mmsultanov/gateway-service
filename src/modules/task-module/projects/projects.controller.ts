import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { ProjectsService } from './projects.service'
import { ResponseProjectCreateDTO } from './dto/response-project-create.dto'
import { RequestProjectCreateDTO } from './dto/request-project-create.dto'
import { ResponseProjectsListDTO } from './dto/response-projects-list.dto'
import { PermissionsGuard } from 'src/common/guards/roles.guard'
import { AuthGuard } from '../../auth/guards/auth.guard'
import { HasPermissions } from 'src/common/decorators/has-permissions.decorator'

@ApiTags('Projects')
@UseGuards(AuthGuard, PermissionsGuard)
@ApiSecurity('JWT-auth')
@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService) {}

    /**
     * Creates a new project.
     *
     * @param payload - The payload containing the project details.
     * @returns A promise that resolves to the created project.
     * @throws Error if the project could not be created.
     * // make example by responeProjectCreateDTO
     * @example {ResponseProjectCreateDTO}
     */
    @ApiOperation({ summary: 'Create a new project', operationId: 'createProject' })
    @ApiResponse({ status: 201, type: ResponseProjectCreateDTO, description: 'Project created successfully' })
    @ApiBody({ type: RequestProjectCreateDTO })
    @HttpCode(HttpStatus.CREATED)
    @HasPermissions('project_create', 'project_all', 'super_admin_create', 'super_admin_all')
    @Post()
    async create_project(@Body() payload: RequestProjectCreateDTO): Promise<ResponseProjectCreateDTO> {
        const response = await this.projectService.create_project(payload)
        return response
    }

    /**
     * Retrieves a list of projects.
     * @returns A promise that resolves to an array of ResponseProjectsListDTO objects.
     */
    @ApiResponse({ status: 200, type: [ResponseProjectsListDTO], description: 'List of projects' })
    @ApiOperation({ summary: 'Get all projects', operationId: 'getProjects' })
    @HttpCode(HttpStatus.OK)
    @HasPermissions('project_index', 'project_all', 'super_admin_index', 'super_admin_all')
    @Get()
    async get_projects(): Promise<Array<ResponseProjectsListDTO>> {
        const response = await this.projectService.get_all()
        return response.map((project) => new ResponseProjectsListDTO(project))
    }

    /**
     * Retrieves a project by its ID.
     *
     * @param id - The ID of the project.
     * @returns A promise that resolves to a ResponseProjectsListDTO object representing the project.
     */
    @ApiResponse({ status: 200, type: ResponseProjectsListDTO, description: 'Project details' })
    @ApiOperation({ summary: 'Get a project by ID', operationId: 'getProject' })
    @ApiParam({ name: 'id', type: String, required: true, description: 'The project ID' })
    @HttpCode(HttpStatus.OK)
    @HasPermissions('project_show', 'project_all', 'super_admin_show', 'super_admin_all')
    @Get('/:id')
    async get_project(@Param('id') id: string): Promise<ResponseProjectsListDTO> {
        return await this.projectService.get_project(id)
    }

    /**
     * Updates a project.
     *
     * @param id - The ID of the project to update.
     * @param payload - The partial project data to update.
     * @returns A promise that resolves to the updated project.
     */
    @ApiResponse({ status: 200, type: ResponseProjectsListDTO, description: 'Project updated successfully' })
    @ApiOperation({ summary: 'Update a project', operationId: 'updateProject' })
    @ApiBody({ type: RequestProjectCreateDTO })
    @HasPermissions('project_update', 'project_all', 'super_admin_update', 'super_admin_all')
    @HttpCode(HttpStatus.OK)
    @Patch('/:id')
    async update_project(@Param('id') id: string, @Body() payload: Partial<RequestProjectCreateDTO>): Promise<ResponseProjectsListDTO> {
        return await this.projectService.update(id, payload)
    }

    /**
     * Deletes a project by its ID.
     *
     * @param id - The ID of the project to delete.
     * @returns A promise that resolves when the project is deleted.
     */
    @ApiResponse({ status: 204, description: 'Project deleted successfully' })
    @ApiOperation({ summary: 'Delete a project', operationId: 'deleteProject' })
    @ApiParam({ name: 'id', type: String, required: true, description: 'The project ID' })
    @HttpCode(HttpStatus.NO_CONTENT)
    @HasPermissions('project_delete', 'project_all', 'super_admin_delete', 'super_admin_all')
    @Delete('/:id')
    async delete_project(@Param('id') id: string): Promise<void> {
        await this.projectService.delete(id)
    }
}
