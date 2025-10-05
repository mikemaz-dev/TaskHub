'use client'

import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import { getAvatarUrl } from '@/utils/getAvatarUrl'

import { clientAvatarRemove, clientAvatarUpload } from '@/services/profile/profile-client.service'
import { TProfile } from '@/types/user/profile.types'

export function useAvatarHandler({ profile }: { profile: TProfile }) {
	const [preview, setPreview] = useState(getAvatarUrl(profile.avatar_path ?? ''))

	const uploadMutation = useMutation({
		mutationFn: async (file: File) => clientAvatarUpload(file, profile.avatar_path ?? ''),
		onSuccess: data => {
			setPreview(getAvatarUrl(data.filePath))
			toast.success('Avatar updated successfully!')
		},
		onError: error => {
			console.error(error)
			toast.error('Failed to upload avatar')
		}
	})

	const removeMutation = useMutation({
		mutationFn: async () => clientAvatarRemove(profile.avatar_path ?? ''),
		onSuccess: () => {
			setPreview('')
			toast.success('Avatar removed')
		},
		onError: error => {
			console.error(error)
			toast.error('Failed to upload avatar')
		}
	})

	return {
		uploadMutation,
		removeMutation,
		preview
	}
}
