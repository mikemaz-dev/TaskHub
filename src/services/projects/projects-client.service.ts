import { createClient } from '@/utils/supabase/client'

export async function getClientProjects() {
	const client = createClient()
	const { data, error } = await client.from('project').select('*').order('created_at', {
		ascending: true
	})

	if (error || !data) throw new Error(error?.message || 'Project not found')
	return data
}