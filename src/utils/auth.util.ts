// lib/utils/auth.ts
import { v4 as uuidv4 } from 'uuid'

import { AuthTokens } from '../types/auth'

export const generateTokens = (): AuthTokens => ({
	accessToken: `access-${uuidv4()}`,
	refreshToken: `refresh-${uuidv4()}`
})

export const generateUserId = (): string => uuidv4()

export const saveTokens = (tokens: AuthTokens): void => {
	localStorage.setItem('accessToken', tokens.accessToken)
	localStorage.setItem('refreshToken', tokens.refreshToken)
}

export const getTokens = (): AuthTokens | null => {
	const accessToken = localStorage.getItem('accessToken')
	const refreshToken = localStorage.getItem('refreshToken')

	return accessToken && refreshToken
		? {
				accessToken,
				refreshToken
			}
		: null
}

export const removeTokens = (): void => {
	localStorage.removeItem('accessToken')
	localStorage.removeItem('refreshToken')
}
