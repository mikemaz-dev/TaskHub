'use client'
import { usePresence } from './PresenceProvider'
import '@/styles/live-status.css'
export function OnlineStatus({ userId }: { userId: string }) {
	const status = usePresence(userId)
	return <span className='th-online-status' data-status={status} title='Online means TaskHub is open in a visible tab'>
		<i />{status === 'online' ? 'Online' : status === 'offline' ? 'Offline' : 'Status unavailable'}
	</span>
}
