import { Model } from 'sequelize-typescript'
import { RolesModel } from '../../roles/models/roles.model'
export declare class PermissionsModel extends Model {
    id: number
    name: string
    roles: RolesModel[]
}
