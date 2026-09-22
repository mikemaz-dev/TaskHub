'use client'

import { createClient } from '@/utils/supabase/client'

export async function clientAvatarUpload(file: File, oldPath?: string) {
	const client = createClient()

	const {
		data: { user },
		error: authError
	} = await client.auth.getUser()
	if (authError || !user) throw new Error(authError?.message || 'User not authenticated')
	if (!file) throw new Error('No file provided')

	if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024)
		throw new Error('Use a JPG, PNG or WebP image under 5 MB')

	const fileExt = file.type === 'image/jpeg' ? 'jpg' : file.type === 'image/png' ? 'png' : 'webp'
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
	if (updateProfileError) {
		await client.storage.from('avatars').remove([filePath])
		throw new Error(updateProfileError.message)
	}
	if (oldPath && oldPath.startsWith(`${user.id}/`))
		await client.storage.from('avatars').remove([oldPath])
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
