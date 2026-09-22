import { createClient } from '@/utils/supabase/client'

export async function createProject(input: { name: string; color: string; deadline: string }) {
	const client = createClient()
	const {
		data: { user },
		error: authError
	} = await client.auth.getUser()
	if (authError || !user) throw new Error('Please sign in again.')
	const name = input.name.trim()
	if (!name || name.length > 100)
		throw new Error('Enter a project name between 1 and 100 characters.')
	const id = crypto.randomUUID()
	const slug = `${
		name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '')
			.slice(0, 50) || 'project'
	}-${id.slice(0, 8)}`
	const { error: saveError } = await client.from('project').insert({
		id,
		name,
		slug,
		owner_id: user.id,
		color: input.color,
		deadline: input.deadline || null
	})
	if (saveError) throw new Error('Could not create the project. Please try again.')

	return slug
}
