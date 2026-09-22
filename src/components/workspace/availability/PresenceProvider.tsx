'use client'
import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { privateChannel } from '@/utils/supabase/private-channel'
import { createClient } from '@/utils/supabase/client'

type Status = 'online' | 'offline' | 'unknown'
const PresenceContext = createContext<Record<string, Status>>({})
export function PresenceProvider({ userId, children }: { userId: string; children: ReactNode }) {
	const [client] = useState(() => createClient())
	const [statuses, setStatuses] = useState<Record<string, Status>>({})
	const { data } = useQuery({ queryKey: ['presence-peers', userId], refetchInterval: 60000,
		queryFn: async () => {
			const { data, error } = await client.from('profile').select('id')
			if (error) throw error
			return data.map(p => p.id)
		}
	})
	const peers = [...new Set([userId, ...(data || [])])].sort().join(',')
	useEffect(() => {
		const ready = new Set<string>()
		let alive = true
		function set(id: string, status: Status) {
			if (alive) setStatuses(previous => previous[id] === status ? previous : { ...previous, [id]: status })
		}
		const channels = peers.split(',').map(id => {
			const item: { id: string; channel: RealtimeChannel | null; close: () => void } = { id, channel: null, close: () => {} }
			item.close = privateChannel(`taskhub-online:${id}`, { config: { presence: { key: userId } } }, channel => {
			item.channel = channel
			channel.on('presence', { event: 'sync' }, () => {
				const online = Object.values(channel.presenceState()).some(entries => entries.length > 0)
				set(id, online ? 'online' : 'offline')
			}).subscribe((status, error) => {
				if (status === 'SUBSCRIBED') {
					ready.add(id)
					if (id === userId && document.visibilityState === 'visible') void channel.track({ online: true })
				} else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
					ready.delete(id); set(id, 'unknown')
					if (alive && status !== 'CLOSED') console.warn('TaskHub presence:', status, error?.message || 'Connection failed')
				}
			})
			}, () => set(id, 'unknown'))
			return item
		})
		function visibility() {
			const own = channels.find(c => c.id === userId)
			if (!own?.channel || !ready.has(userId)) return
			if (document.visibilityState === 'visible') void own.channel.track({ online: true })
			else void own.channel.untrack()
		}
		document.addEventListener('visibilitychange', visibility)
		return () => {
			alive = false
			document.removeEventListener('visibilitychange', visibility)
			channels.forEach(({ close }) => close())
		}
	}, [client, peers, userId])
	return <PresenceContext.Provider value={statuses}>{children}</PresenceContext.Provider>
}
export function usePresence(userId: string) { return useContext(PresenceContext)[userId] || 'unknown' }
