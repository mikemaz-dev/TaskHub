import type { IProfile } from '@/types/profile.types'

export interface IComment {
	id: string
	text: string
	author: IProfile
}
