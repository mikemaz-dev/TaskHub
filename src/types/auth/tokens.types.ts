export const token = {
	accessToken: 'accessToken',
	refreshToken: 'refreshToken'
}

export type TToken = (typeof token)[keyof typeof token]
