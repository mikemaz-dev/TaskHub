import { create } from 'zustand/react'

import type { IAuthStore } from '@/store/interfaces/auth-store.interface'

import { TokenService } from '@/lib/token-sevice'
import { token } from '@/types/auth/tokens.types'

export const useAuthStore = create<IAuthStore>(set => ({
	isLoggedIn: !!TokenService.get(token.accessToken),

	login: () => {
		set({ isLoggedIn: true })
		TokenService.set(token.accessToken, 'mock-access-token')
		TokenService.set(token.refreshToken, 'mock-refresh-token')
	},
	logout: () => {
		set({ isLoggedIn: false })
		TokenService.remove(token.accessToken)
		TokenService.remove(token.refreshToken)
	}
}))
