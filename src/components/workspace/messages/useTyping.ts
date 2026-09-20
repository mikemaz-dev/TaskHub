import { useCallback, useEffect, useRef, useState } from 'react'
import { privateChannel } from '@/utils/supabase/private-channel'
import type { RealtimeChannel } from '@supabase/supabase-js'

export function useTyping(userId: string, contactId: string, projectId: string) {
	const [typing, setTyping] = useState(false)
	const channel = useRef<RealtimeChannel | null>(null)
	const ready = useRef(false)
	const lastSent = useRef(0)
	const stop = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
	const notify = useCallback(function emit(active: boolean) {
		clearTimeout(stop.current)
		if (!ready.current || !channel.current) return
		if (!active || Date.now() - lastSent.current > 1000) {
			lastSent.current = Date.now()
			void channel.current.send({ type: 'broadcast', event: 'typing', payload: { sender: userId, active } })
		}
		if (active) stop.current = setTimeout(() => emit(false), 2500)
	}, [userId])
	useEffect(() => {
		if (!contactId || !projectId) return
		let expiry: ReturnType<typeof setTimeout> | undefined
		let alive = true
		const close = privateChannel(`taskhub-typing:${[userId, contactId].sort().join(':')}:${projectId}`, { config: { broadcast: { self: false } } }, room => {
		channel.current = room
		room.on('broadcast', { event: 'typing' }, ({ payload }) => {
			if (!alive || payload.sender !== contactId) return
			clearTimeout(expiry)
			setTyping(payload.active === true)
			expiry = setTimeout(() => setTyping(false), 5000)
		}).subscribe((status, error) => {
			ready.current = status === 'SUBSCRIBED'
			if (alive) setTyping(false)
			if (alive && (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT')) console.warn('TaskHub typing:', status, error?.message || 'Connection failed')
		})
		}, () => { ready.current = false; if (alive) setTyping(false) })
		const hide = () => { if (document.visibilityState !== 'visible') notify(false) }
		document.addEventListener('visibilitychange', hide)
		return () => {
			alive = false
			notify(false)
			ready.current = false
			channel.current = null
			lastSent.current = 0
			clearTimeout(expiry)
			clearTimeout(stop.current)
			document.removeEventListener('visibilitychange', hide)
			close()
		}
	}, [userId, contactId, projectId, notify])

	return { typing, notify }
}
