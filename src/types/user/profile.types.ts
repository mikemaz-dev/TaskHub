import type { Database } from '@/types/db.types'

export type TProfile = Database['public']['Tables']['profile']['Row'] & {
	email: string
}
