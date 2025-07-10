import Cookies from 'js-cookie'

import type { TToken } from '@/types/auth/tokens.types'

export class TokenService {
	static set(name: TToken, token: string) {
		Cookies.set(name, token, {
			expires: 7,
			path: '/',
			sameSite: 'lax'
		})
	}

	static get(name: TToken): string | undefined {
		return Cookies.get(name)
	}

	static remove(name: TToken) {
		Cookies.remove(name, {
			path: '/'
		})
	}
}
