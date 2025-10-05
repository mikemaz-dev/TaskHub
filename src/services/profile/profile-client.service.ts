'use client'

import { createClient } from '@/utils/supabase/client'

import { TProfile } from '@/types/user/profile.types'
import { ProfileSchema } from '@/zod-schemes/profile.zod'

export async function getClientAllProfiles() {
	const client = createClient()

	const { data, error } = await client.from('profile').select('*')

	if (error || !data) throw new Error(error.message || 'Profiles not found')

	return data
}

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

export async function clientAvatarUpload(file: File, oldPath?: string) {
	const client = createClient()

	const {
		data: { user },
		error: authError
	} = await client.auth.getUser()
	if (authError || !user) throw new Error(authError?.message || 'User not authenticated')
	if (!file) throw new Error('No file provided')

	if (oldPath) {
		await client.storage.from('avatars').remove([oldPath])
	}

	const fileExt = file.name.split('.').pop()
	const fileName = `${user.id}-${Date.now()}.${fileExt}`
	const filePath = `${user.id}/${fileName}`

	const { error: uploadError } = await client.storage
		.from('avatars')
		.upload(filePath, file, { upsert: true })
	if (uploadError) throw new Error(uploadError.message)

	const { data: publicData } = client.storage.from('avatars').getPublicUrl(filePath)
	const url = publicData.publicUrl
	if (!url) throw new Error('Failed to get public URL')

	const { error: updateProfileError } = await client
		.from('profile')
		.update({ avatar_path: filePath })
		.eq('id', user.id)
	if (updateProfileError) throw new Error(updateProfileError.message)

	return { filePath, url }
}

export async function clientAvatarRemove(oldPath: string) {
	if (!oldPath) return
	const client = createClient()

	const {
		data: { user },
		error: authError
	} = await client.auth.getUser()
	if (authError || !user) throw new Error(authError?.message || 'User not authenticated')

	const { error: removeError } = await client.storage.from('avatars').remove([oldPath])
	if (removeError) throw new Error(removeError.message)

	const { error: updateProfileError } = await client
		.from('profile')
		.update({ avatar_path: null })
		.eq('id', user.id)

	if (updateProfileError) throw new Error(updateProfileError.message)

	return true
}
