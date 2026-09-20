'use server'

import { redirect } from 'next/navigation'

import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerProfile() {
	const client = await createClientFromServer()

	const {
		data: { user },
		error: authError
	} = await client.auth.getUser()

	if (authError || !user) {
		throw new Error(authError?.message || 'User not found')
	}

	const { data, error } = await client.from('profile').select('*').eq('id', user.id).maybeSingle()

	if (error) throw new Error('Could not load your profile')
	if (!data) return redirect('/onboarding')

	return { ...user, ...data, email: user.email ?? '' }
}
