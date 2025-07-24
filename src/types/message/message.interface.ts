import type { Database } from '@/types/db.types'
import type { TProfile } from '@/types/user/profile.types'

export type TChatMessageWithProfile = Database['public']['Tables']['chat_message']['Row'] & {
	profile: TProfile | null
}
