import type { IProfile } from '@/types/user/profile.types'

export interface IComment {
	id: string
	text: string
	author: IProfile
}
