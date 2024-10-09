import { Model } from 'sequelize-typescript'
import { RolesModel } from '../../roles/models/roles.model'
export declare class UserModel extends Model {
    id: number
    first_name: string
    last_name: string
    email: string
    password: string
    role_id: number
    role: RolesModel
    deleted_at: Date
    is_active: boolean
    is_deleted: boolean
    created_at: Date
    updated_at: Date
}
