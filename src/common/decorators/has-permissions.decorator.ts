import { SetMetadata } from '@nestjs/common'

export const HAS_PERMISSIONS_KEY = 'has_permissions'
export const HasPermissions = (...permissions: string[]) => SetMetadata(HAS_PERMISSIONS_KEY, permissions)
