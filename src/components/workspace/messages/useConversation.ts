import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { createClient } from '@/utils/supabase/client'

export function useConversation(
	client: ReturnType<typeof createClient>,
	contactId: string,
	userId: string,
	projectId: string
) {
	const [sendError, setError] = useState('')
	const { data, isPending, error, refetch } = useQuery({
		queryKey: ['conversation', userId, contactId, projectId],
		enabled: !!contactId && !!projectId,
		refetchInterval: 15000,
		queryFn: async () => {
			let query = client
				.from('taskhub_direct_message')
				.select('*')
				.or(
					`and(sender_id.eq.${userId},recipient_id.eq.${contactId}),and(sender_id.eq.${contactId},recipient_id.eq.${userId})`
				)
				.order('created_at', { ascending: false })
				.limit(100)
			query = projectId === 'general' ? query.is('project_id', null) : query.eq('project_id', projectId)
			const { data, error } = await query
			if (error) throw error
			return (data ?? []).reverse()
		}
	})
	useEffect(() => {
		const channel = client
			.channel(`direct-messages-${userId}-${contactId}`)
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'taskhub_direct_message' },
				() => void refetch()
			)
			.subscribe()
		return () => {
			void client.removeChannel(channel)
		}
	}, [client, userId, contactId, refetch])
	return {
		messages: data ?? [],
		loading: !!contactId && !!projectId && isPending,
		error: sendError || (error ? 'Conversations are unavailable. Please try again shortly.' : ''),
		setError,
		refresh: refetch
	}
}
