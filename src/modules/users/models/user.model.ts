import { Model, Column, Table, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { RolesModel } from '../../roles/models/roles.model'

@Table({
    tableName: 'users',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ],
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    defaultScope: {
        attributes: {
            exclude: ['password']
        }
    }
})
export class UserModel extends Model {
    @Column({
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @Column
    first_name: string

    @Column
    last_name: string

    @Column({
        unique: true,
        validate: {
            isEmail: true
        }
    })
    email: string

    @Column
    password: string

    @ForeignKey(() => RolesModel)
    @Column
    role_id: number

    @BelongsTo(() => RolesModel)
    role: RolesModel

    @Column
    deleted_at: Date

    @Column({ defaultValue: true })
    is_active: boolean

    @Column({ defaultValue: false })
    is_deleted: boolean

    @Column({
        type: 'TIMESTAMP',
        defaultValue: new Date()
    })
    created_at: Date

    @Column({
        type: 'TIMESTAMP',
        defaultValue: new Date()
    })
    updated_at: Date
}
