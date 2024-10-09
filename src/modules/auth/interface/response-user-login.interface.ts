import { LoggedUserRoleInterface } from './logged-user-role.interface'

export class ResponseUserLoginInterface {
    id: number
    first_name: string
    last_name: string
    email: string
    role_id: number
    is_active: boolean
    is_deleted: boolean
    created_at: Date
    updated_at: Date
    role: LoggedUserRoleInterface
    access_token: string
}
