'use client'

import { createClient } from '@/utils/supabase/client'

import { TProfile } from '@/types/user/profile.types'
import { ProfileSchema } from '@/zod-schemes/profile.zod'

export async function getClientProfile() {
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

export async function updateClientProfile(profile: Partial<Omit<TProfile, 'email'>>) {
	const client = createClient()

	const {
		data: { user },
		error: authError
	} = await client.auth.getUser()

	if (authError || !user) {
		throw new Error(authError?.message || 'User not found')
	}
	const parsed = ProfileSchema.omit({ email: true }).partial().safeParse(profile)
	
	if (!parsed.success) {
		throw new Error(parsed.error.errors.map(e => e.message).join(', '))
	}

	const { data, error } = await client
		.from('profile')
		.update(parsed.data)
		.eq('id', user.id)
		.select()
		.single()

	if (error || !data) {
		throw new Error(error?.message || 'Profile update failed')
	}

	return { ...user, ...data }
}
