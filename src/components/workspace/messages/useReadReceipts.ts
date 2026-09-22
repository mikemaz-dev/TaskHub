import { useEffect } from 'react'

import { createClient } from '@/utils/supabase/client'

import { useInbox } from '../InboxProvider'

import type { Database } from '@/types/db.types'

type Message = Database['public']['Tables']['taskhub_direct_message']['Row']
export function useReadReceipts(
	client: ReturnType<typeof createClient>,
	messages: Message[],
	userId: string
) {
	const { refresh } = useInbox()
	useEffect(() => {
		const mark = async () => {
			if (document.visibilityState !== 'visible' || !document.hasFocus()) return
			const ids = messages.filter(m => m.recipient_id === userId && !m.read_at).map(m => m.id)
			if (!ids.length) return
			const { error } = await client
				.from('taskhub_direct_message')
				.update({ read_at: new Date().toISOString() })
				.in('id', ids)
				.eq('recipient_id', userId)
				.is('read_at', null)
			if (!error) refresh()
		}
		void mark()
		window.addEventListener('focus', mark)
		document.addEventListener('visibilitychange', mark)
		return () => {
			window.removeEventListener('focus', mark)
			document.removeEventListener('visibilitychange', mark)
		}
	}, [client, messages, userId, refresh])
}
