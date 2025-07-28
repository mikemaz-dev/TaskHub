'use client'

import { createClient } from '@/utils/supabase/client'

export async function getClientUsers() {
	const client = createClient()

	const { data, error } = await client.from('profile').select('*')

	if (error || !data) throw new Error(error?.message || 'Users not found')
	return data
}
