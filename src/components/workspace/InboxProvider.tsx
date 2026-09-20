'use client'

import { type ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react'

import { createClient } from '@/utils/supabase/client'

const InboxContext = createContext({ messages: 0, notifications: 0, refresh: () => {} })
export function InboxProvider({ userId, children }: { userId: string; children: ReactNode }) {
	const [client] = useState(() => createClient())
	const [counts, setCounts] = useState({ messages: 0, notifications: 0 })
	const refresh = useCallback(async () => {
		const [messages, notifications] = await Promise.all([
			client
				.from('taskhub_direct_message')
				.select('id', { count: 'exact', head: true })
				.eq('recipient_id', userId)
				.is('read_at', null),
			client
				.from('taskhub_notification')
				.select('id', { count: 'exact', head: true })
				.eq('recipient_id', userId)
				.is('read_at', null)
		])
		setCounts(previous => ({
			messages: messages.error ? previous.messages : (messages.count ?? 0),
			notifications: notifications.error ? previous.notifications : (notifications.count ?? 0)
		}))
	}, [client, userId])
	useEffect(() => {
		// Network response updates state asynchronously; this effect only starts the subscription.
		// eslint-disable-next-line react-hooks/set-state-in-effect
		void refresh()
		const channel = client
			.channel(`inbox-${userId}`)
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'taskhub_direct_message',
					filter: `recipient_id=eq.${userId}`
				},
				() => void refresh()
			)
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'taskhub_notification',
					filter: `recipient_id=eq.${userId}`
				},
				() => void refresh()
			)
			.subscribe()
		const timer = setInterval(() => void refresh(), 15000)
		const focus = () => void refresh()
		window.addEventListener('focus', focus)
		return () => {
			clearInterval(timer)
			window.removeEventListener('focus', focus)
			void client.removeChannel(channel)
		}
	}, [client, userId, refresh])
	return <InboxContext.Provider value={{ ...counts, refresh }}>{children}</InboxContext.Provider>
}
export function useInbox() {
	return useContext(InboxContext)
}
