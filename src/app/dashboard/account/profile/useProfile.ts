'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateClientProfile } from '@/services/profile/profile-client.service'

const PROFILE_QUERY_KEY = ['profile']

export function useProfile() {
	const queryClient = useQueryClient()

	const { mutate: updateProfile, isPending: isUpdating } = useMutation({
		mutationFn: updateClientProfile,
		onSuccess: data => {
			queryClient.setQueryData(PROFILE_QUERY_KEY, data)
		},
		onError: err => {
			console.error('Profile update failed:', err)
		}
	})

	return {
		updateProfile,
		isUpdating,
		refetch: () => queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY })
	}
}
