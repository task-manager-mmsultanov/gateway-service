import { Model, Table, ForeignKey, Column } from 'sequelize-typescript'
import { PermissionsModel } from './../../permissions/models/permissions.model'
import { RolesModel } from './../../roles/models/roles.model'

@Table({
    tableName: 'role_permissions',
    timestamps: false
})
export class RolePermissionsModel extends Model {
    @ForeignKey(() => RolesModel)
    @Column
    role_id: number

    @ForeignKey(() => PermissionsModel)
    @Column
    permission_id: number
}
