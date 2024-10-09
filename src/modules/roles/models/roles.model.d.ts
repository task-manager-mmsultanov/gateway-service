import { Model } from 'sequelize-typescript'
import { PermissionsModel } from './../../permissions/models/permissions.model'
import { UserModel } from './../../users/models/user.model'
export declare class RolesModel extends Model {
    id: number
    name: string
    slug: string
    users: Array<UserModel>
    permissions: Array<PermissionsModel>
}
