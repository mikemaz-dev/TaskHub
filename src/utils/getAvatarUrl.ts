export const getAvatarUrl = (path?: string) => {
	if (!path) return '/images/default-avatar.png'
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
	return `${supabaseUrl}/storage/v1/object/public/avatars/${path}`
}
