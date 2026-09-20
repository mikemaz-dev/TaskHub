'use server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerProjects(includeArchived = false) {
	const client = await createClientFromServer()

	const result = await client.from('project').select('*')
	return {
		...result,
		data: result.data?.filter(p => includeArchived || (!p.archived_at && !p.completed_at)) ?? null
	}
}

export async function getServerProjectBySlug(slug: string) {
	const client = await createClientFromServer()

	const result = await client
		.from('project')
		.select(
			'*, task(*, sub_task(*), task_participants(profile(*))), project_participants(*,profile(*))'
		)
		.eq('slug', slug)
	const ownerId = result.data?.[0]?.owner_id
	const owner = ownerId ? await client.from('profile').select('*').eq('id', ownerId).maybeSingle() : null
	return { ...result, data: result.data?.map(project => ({ ...project, owner_profile: owner?.data || null })) || null }
}
