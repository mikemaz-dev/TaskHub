'use server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerUsers() {
	const client = await createClientFromServer()

	return client.from('profile').select('*')
}
