import type { RealtimeChannel, RealtimeChannelOptions } from '@supabase/supabase-js'
import { createClient } from './client'

// Supabase reuses channels by topic. Wait for removal before reopening in Strict Mode.
const lifetimes = new Map<string, Promise<void>>()
export function privateChannel(topic: string, options: RealtimeChannelOptions,
	configure: (channel: RealtimeChannel) => void, failed: () => void) {
	const client = createClient()
	const previous = lifetimes.get(topic) || Promise.resolve()
	let release!: () => void
	const lifetime = new Promise<void>(resolve => { release = resolve })
	lifetimes.set(topic, lifetime)
	let closed = false
	let room: RealtimeChannel | null = null
	const started = (async () => {
		try {
			await previous
			if (closed) return
			const { data, error } = await client.auth.getSession()
			if (error || !data.session) throw new Error('Authenticated session required')
			await client.realtime.setAuth(data.session.access_token)
			if (closed) return
			room = client.channel(topic, { ...options, config: { ...options.config, private: true } })
			configure(room)
		} catch {
			if (!closed) {
				console.warn('TaskHub Realtime: could not authenticate a private channel.')
				failed()
			}
		}
	})()
	return () => {
		closed = true
		void started.finally(async () => {
			try { if (room) await client.removeChannel(room) }
			finally {
				release()
				if (lifetimes.get(topic) === lifetime) lifetimes.delete(topic)
			}
		})
	}
}
