import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useInbox } from '../InboxProvider'

export function useProjectUnread(contactId: string) {
	const [client] = useState(() => createClient())
	const inbox = useInbox()
	const { data } = useQuery({
		queryKey: ['project-unread', contactId, inbox.messages],
		enabled: !!contactId,
		refetchInterval: 15000,
		queryFn: async (): Promise<Record<string, number>> => {
			const { data: auth } = await client.auth.getUser()
			if (!auth.user) return {}
			const { data, error } = await client.from('taskhub_direct_message')
				.select('project_id').eq('sender_id', contactId)
				.eq('recipient_id', auth.user.id).is('read_at', null)
			if (error) throw error
			return (data || []).reduce<Record<string, number>>((counts, message) => {
				const key = message.project_id || 'general'
				counts[key] = (counts[key] || 0) + 1
				return counts
			}, {})
		}
	})
	return data || {}
}
