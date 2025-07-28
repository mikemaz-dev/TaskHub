import type { getClientUsers } from '@/services/users/get-users-client'
import type { getServerUsers } from '@/services/users/get-users-server'

export type TGetUsersResponse = NonNullable<Awaited<ReturnType<typeof getServerUsers>>['data']>

export type TGetClientUsersResponse = Awaited<ReturnType<typeof getClientUsers>>
