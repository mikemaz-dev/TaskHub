import { createClient } from '@/utils/supabase/client'

export async function getProfile() {
	const client = createClient()

	const {
		data: { user },
		error: authError
	} = await client.auth.getUser()

	if (authError || !user) {
		throw new Error(authError?.message || 'User not found')
	}

	const { data, error } = await client.from('profile').select('*').eq('id', user.id).single()

	if (error || !data) throw new Error(error?.message || 'Profile not found')

	return { ...user, ...data }
}
