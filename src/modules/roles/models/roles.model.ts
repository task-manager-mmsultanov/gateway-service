import { Model, Column, HasMany, Table, BelongsToMany } from 'sequelize-typescript'
import { RolePermissionsModel } from './../../permissions/models/role-permissions.model'
import { PermissionsModel } from './../../permissions/models/permissions.model'
import { UserModel } from './../../users/models/user.model'

@Table({
    tableName: 'roles',
    timestamps: false,
    paranoid: false,
    indexes: [
        {
            unique: true,
            fields: ['slug']
        }
    ],
    updatedAt: 'updated_at',
    createdAt: 'created_at'
})
export class RolesModel extends Model {
    @Column({
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @Column
    name: string

    @Column({
        unique: true
    })
    slug: string

    @HasMany(() => UserModel, { foreignKey: 'id' })
    users: Array<UserModel>

    @BelongsToMany(() => PermissionsModel, () => RolePermissionsModel)
    permissions: Array<PermissionsModel>
}
