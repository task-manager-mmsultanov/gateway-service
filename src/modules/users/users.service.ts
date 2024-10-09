import { InjectModel } from '@nestjs/sequelize'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { UserModel } from './models/user.model'

import { UserExistsException } from 'src/common/exceptions/user-exist.exception'

import { ResponseUserInterface } from './interface/response-user.interface'
import type { CreateUserInterface } from './interface/create-user.interface'
import { ResponseAllUsersInterface } from './interface/response-all-users.interface'
import { ResponseOneUserInterface } from './interface/response-one-user.interface'
import { UpdateUserInterface } from './interface/update-user.interface'
import { RolesModel } from '../roles/models/roles.model'
import { ResponseUserRegisterInterface } from './interface/response-user-register.interface'

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserModel) private readonly userModel: typeof UserModel) {}

    /**
     * Creates a new user.
     *
     * @param user_data - The user data used to create the user.
     * @returns A promise that resolves to the created user.
     * @throws {UserExistsException} If a user with the same email already exists.
     * @throws {Error} If an error occurs while creating the user.
     */
    async create(user_data: Partial<CreateUserInterface>): Promise<ResponseUserInterface> {
        const UserExists = await this.userModel.findOne({ where: { email: user_data.email } })
        if (UserExists) {
            throw new UserExistsException()
        }
        try {
            const salt_or_rounds = Number(process.env.SALT) || 12
            const password = user_data.password
            const hashed_password = await bcrypt.hash(password, salt_or_rounds)
            user_data = { ...user_data, role_id: 1, password: hashed_password }
            const user = await this.userModel.create(user_data)
            return user
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * Fetches all users.
     *
     * @returns A promise that resolves to an array of users.
     */
    async get_all(): Promise<Array<ResponseAllUsersInterface>> {
        try {
            const users = await this.userModel.findAll({
                attributes: ['first_name', 'last_name', 'email', 'deleted_at', 'is_active', 'is_deleted', 'created_at', 'updated_at']
            })
            return users
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * Fetches a user by their ID.
     *
     * @param id - The ID of the user to fetch.
     * @returns A promise that resolves to the user.
     */
    async get_by_id(id: number): Promise<ResponseOneUserInterface> {
        try {
            const user = await this.userModel.findByPk(id)
            return user
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * Updates a user by their ID.
     *
     * @param id - The ID of the user to update.
     * @param user_data - The data to update the user with.
     * @returns A promise that resolves to the updated user.
     */
    async update(id: number, user_data: Partial<UpdateUserInterface>): Promise<ResponseOneUserInterface> {
        try {
            const salt_or_rounds = Number(process.env.SALT) || 12
            const password = user_data.password
            const hashed_password = await bcrypt.hash(password, salt_or_rounds)
            const user = await this.userModel.findByPk(id)
            await user.update({ ...user_data, password: hashed_password })
            return user
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * Deletes a user by their ID.
     *
     * @param id - The ID of the user to delete.
     * @returns A promise that resolves to void.
     */
    async delete(id: number): Promise<void> {
        try {
            const user = await this.userModel.findByPk(id)
            await user.destroy()
        } catch (err) {
            throw new Error(err)
        }
    }

    /**
     * Finds a user by their email.
     * @param email - The email of the user to find.
     * @returns A promise that resolves to the found user or null if not found.
     */
    async findOne(email: string): Promise<UserModel | null> {
        return this.userModel.findOne({
            where: { email },
            include: [RolesModel],
            attributes: ['id', 'first_name', 'last_name', 'email', 'password', 'role_id', 'is_active', 'is_deleted', 'created_at', 'updated_at', 'password']
        })
    }

    /**
     * Register a new user.
     *
     * @param user_data - The user data used to create the user.
     * @returns A promise that resolves to the created user.
     * @throws {UserExistsException} If a user with the same email already exists.
     * @throws {Error} If an error occurs while creating the user.
     */
    async register(user_data: Partial<CreateUserInterface>): Promise<ResponseUserRegisterInterface> {
        const UserExists = await this.userModel.findOne({ where: { email: user_data.email } })
        if (UserExists) {
            throw new UserExistsException()
        }
        try {
            const salt_or_rounds = Number(process.env.SALT) || 12
            const password = user_data.password
            const hashed_password = await bcrypt.hash(password, salt_or_rounds)
            user_data = { ...user_data, role_id: 1, password: hashed_password }
            const user = await this.userModel.create(user_data)
            return user
        } catch (err) {
            throw new Error(err)
        }
    }
}
