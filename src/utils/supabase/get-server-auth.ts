import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerAuth() {
	const supabase = await createClientFromServer()
	const { data, error } = await supabase.auth.getUser()

	if (error || !data?.user) {
		return null
	}

	return data.user
}
