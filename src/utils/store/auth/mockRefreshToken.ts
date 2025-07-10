export const mockRefreshToken = (
	refreshToken: string
): Promise<{ accessToken: string; refreshToken: string }> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				accessToken: `mock-access-${Date.now()}`,
				refreshToken: `mock-refresh-${Date.now()}`
			})
		}, 500)
	})
}
