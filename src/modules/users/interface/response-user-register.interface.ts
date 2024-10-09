export interface ResponseUserRegisterInterface {
    id: number
    first_name: string
    last_name: string
    email: string
    password: string
    role: {
        name: string
        slug: string
    }
}
