import { createClientFromServer } from '@/utils/supabase/server'

import { getServerAuth } from '@/services/get-server-auth'

export async function getTeamNetwork() {
	const user = await getServerAuth(true)
	const client = await createClientFromServer()
	const { data: projects, error } = await client
		.from('project')
		.select('*, project_participants(*,profile(*))')
	if (error) throw new Error('Could not load your team.')
	const accessible = (projects ?? []).filter(
		p => p.owner_id === user!.id || p.project_participants.some(m => m.profile?.id === user!.id)
	)
	const ownerIds = Array.from(
		new Set(accessible.map(p => p.owner_id).filter((id): id is string => !!id))
	)
	const { data: owners, error: ownersError } = ownerIds.length
		? await client.from('profile').select('*').in('id', ownerIds)
		: { data: [], error: null }
	if (ownersError) throw new Error('Could not load project owners.')
	const profiles = [
		...(owners ?? []),
		...accessible.flatMap(p => p.project_participants.map(m => m.profile))
	]
	return {
		userId: user!.id,
		projects: accessible,
		members: Array.from(new Map(profiles.filter(Boolean).map(p => [p.id, p])).values())
	}
}
