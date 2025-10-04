'use server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerProjects() {
	const client = await createClientFromServer()

	return client.from('project').select('*')
}

export async function getServerProjectBySlug(slug: string) {
	const client = await createClientFromServer()

	return await client
		.from('project')
		.select(
			'*, task(*, sub_task(*), task_participants(profile(*))), project_participants(profile(*))'
		)
		.eq('slug', slug)
}
