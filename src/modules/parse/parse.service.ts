import { HttpException, Injectable } from '@nestjs/common'
import { RolesModel } from '../roles/models/roles.model'
import { InjectModel } from '@nestjs/sequelize'
import { UserModel } from '../users/models/user.model'
import { PermissionsModel } from '../permissions/models/permissions.model'
import { Sequelize } from 'sequelize-typescript'
import * as bcrypt from 'bcrypt'

@Injectable()
export class ParseService {
    constructor(
        @InjectModel(RolesModel) private readonly rolesModel: typeof RolesModel,
        @InjectModel(PermissionsModel) private readonly permissionsModel: typeof PermissionsModel,
        @InjectModel(UserModel) private readonly userModel: typeof UserModel,
        private readonly sequelize: Sequelize
    ) {}

    /**
     * Generates an array of permissions based on the given subjects and actions.
     *
     * @param subjects - An array of strings representing the subjects.
     * @param actions - An array of strings representing the actions.
     * @returns An array of objects containing the generated permissions.
     */
    private generate_permissions = (subjects: Array<string>, actions: Array<string>): Array<{ name: string }> => {
        const permissions: Array<{ name: string }> = []

        for (const subject of subjects) {
            for (const action of actions) {
                const permission: { name: string } = {
                    name: `${subject.toLowerCase()}_${action}`
                }
                permissions.push(permission)
            }
        }

        return permissions
    }

    /**
     * Creates multiple permissions in bulk.
     *
     * @param permissions - An array of objects containing the name of each permission.
     * @returns Promise<void>
     * @throws HttpException if an error occurs during the creation process.
     */
    private bulk_create_permissions = async (permissions: Array<{ name: string }>) => {
        try {
            const transaction = await this.sequelize.transaction()
            await this.permissionsModel.bulkCreate(permissions, { transaction })
            await transaction.commit()
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return
            } else {
                throw new HttpException(error.message, error.status)
            }
        }
    }

    /**
     * Creates multiple roles in bulk.
     *
     * @param roles - An array of objects representing the roles to be created.
     * Each object should have the following properties:
     *   - name: The name of the role.
     *   - slug: The slug of the role.
     *   - permissions: An array of strings representing the permissions associated with the role.
     * @returns A Promise that resolves to an array of the created roles.
     * @throws {HttpException} If an error occurs during the creation process.
     */
    private bulk_create_roles = async (roles: Array<{ name: string; slug: string; permissions: string[] }>) => {
        const transaction = await this.sequelize.transaction()
        try {
            const createdRoles = []
            for (const role of roles) {
                // Используем findOrCreate, чтобы найти или создать роль
                const [createdRole, created] = await this.rolesModel.findOrCreate({
                    where: { name: role.name }, // Находим по имени
                    defaults: { slug: role.slug }, // Создаем с этими значениями, если не найдено
                    transaction
                })

                const permissions = await this.permissionsModel.findAll({ where: { name: role.permissions }, transaction })

                // Связываем права с ролью
                await createdRole.$set('permissions', permissions, { transaction })

                // Добавляем созданную или найденную роль в массив
                createdRoles.push(createdRole)
            }
            await transaction.commit()

            // Возвращаем данные созданных или найденных ролей
            return createdRoles
        } catch (error) {
            await transaction.rollback()
            throw new HttpException(error.message, error.status)
        }
    }

    /**
     * Bulk creates users.
     *
     * @param users - An array of user objects containing the following properties:
     *   - first_name: The first name of the user (string).
     *   - last_name: The last name of the user (string).
     *   - email: The email of the user (string).
     *   - password: The password of the user (string).
     *   - avatar: The avatar of the user (string).
     *   - role_id: The role ID of the user (number).
     * @returns Promise<void>
     * @throws HttpException if an error occurs during the creation process.
     */
    private bulk_create_users = async (
        users: Array<{ first_name: string; last_name: string; email: string; password: string; avatar: string; role_id: number }>
    ) => {
        const transaction = await this.sequelize.transaction()
        try {
            for (const user of users) {
                await this.userModel.create(user, { transaction })
            }
            await transaction.commit()
        } catch (error) {
            await transaction.rollback()
            throw new HttpException(error.message, error.status)
        }
    }

    /**
     * Parses data and performs various operations such as generating permissions, creating roles, and creating users.
     *
     * @returns {Promise<void>} A promise that resolves when the data parsing is complete.
     */
    async parse_data() {
        const subjects: string[] = ['user', 'permission', 'role', 'account', 'project', 'board', 'column', 'task']
        const actions: string[] = ['index', 'create', 'read', 'update', 'delete', 'all']
        const permissions = this.generate_permissions(subjects, actions)
        await this.bulk_create_permissions(permissions)

        const roles = [
            {
                name: 'User',
                slug: 'user',
                permissions: []
            },
            {
                name: 'Admin',
                slug: 'admin',
                permissions: permissions.map((permission) => permission.name)
            }
        ]

        const roles_response = await this.bulk_create_roles(roles)
        const role_data = roles_response.map((role) => {
            return {
                id: role.id,
                name: role.name,
                slug: role.slug
            }
        })

        const salt_or_rounds = Number(process.env.SALT) || 12
        const password = 'test'
        const hashed_password = await bcrypt.hash(password, salt_or_rounds)

        const users = [
            {
                first_name: 'Super Admin',
                last_name: 'User',
                email: 'test@example.com',
                password: hashed_password,
                avatar: 'test',
                role_id: role_data.find((role) => role.slug === 'admin').id
            },
            {
                first_name: 'John',
                last_name: 'Doe',
                email: 'test_user@example.com',
                password: hashed_password,
                avatar: 'test',
                role_id: role_data.find((role) => role.slug === 'user').id
            }
        ]

        await this.bulk_create_users(users)
    }
}
