export const getAvatarUrl = (path?: string) => {
	if (!path) return '/images/default-avatar.png'
	if (path.startsWith('https://')) {
		try {
			const url = new URL(path)
			if (
				/^avatars[0-9]*\.githubusercontent\.com$/.test(url.hostname) ||
				(url.hostname.endsWith('.supabase.co') &&
					url.pathname.startsWith('/storage/v1/object/public/'))
			)
				return url.href
		} catch {
			/* Fall through to the default avatar. */
		}
		return '/images/default-avatar.png'
	}
	if (path.includes('://') || path.startsWith('//')) return '/images/default-avatar.png'
	return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${path.replace(/^\/+/, '')}`
}
