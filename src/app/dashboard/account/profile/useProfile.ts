'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormEvent } from 'react'

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

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		updateProfile(
			{
				name: formData.get('name') as string,
				nick: formData.get('nick') as string,
				profession: formData.get('profession') as string,
				description: formData.get('description') as string
			},
			{ onSuccess: () => queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY }) }
		)
	}

	return {
		updateProfile,
		isUpdating,
		handleSubmit
	}
}
