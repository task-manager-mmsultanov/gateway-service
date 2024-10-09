export interface ResponseOneUserInterface {
    id: number
    first_name: string
    last_name: string
    email: string
    role_id: number
    deleted_at: Date | null
    is_active: boolean
    is_deleted: boolean
    created_at: Date
    updated_at: Date
}
