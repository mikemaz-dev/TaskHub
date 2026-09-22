'use client'

import { useCallback, useEffect, useState } from 'react'

import { createClient } from '@/utils/supabase/client'

import { useInbox } from './InboxProvider'
import type { Database } from '@/types/db.types'

type Notification = Database['public']['Tables']['taskhub_notification']['Row']
export function useNotifications() {
	const [client] = useState(() => createClient())
	const [items, setItems] = useState<Notification[]>([])
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(true)
	const [unread, setUnread] = useState(false)
	const inbox = useInbox()
	const load = useCallback(async () => {
		const { data, error } = await client
			.from('taskhub_notification')
			.select('*')
			.order('created_at', { ascending: false })
			.limit(100)
		setLoading(false)
		if (error) setError('Notifications could not be loaded. Please try again.')
		else {
			setItems(data ?? [])
			setError('')
		}
	}, [client])
	useEffect(() => {
		// Network response updates state asynchronously; this effect only starts the subscription.
		// eslint-disable-next-line react-hooks/set-state-in-effect
		void load()
	}, [load, inbox.notifications])
	async function mark(id?: string) {
		let query = client
			.from('taskhub_notification')
			.update({ read_at: new Date().toISOString() })
			.is('read_at', null)
		if (id) query = query.eq('id', id)
		const { error } = await query
		if (error) {
			setError('Could not mark notifications as read.')
			return
		}
		await load()
		inbox.refresh()
	}
	return { items, error, loading, unread, setUnread, inbox, load, mark }
}
