import { useEffect, useState } from 'react'
import { localNow } from '@/utils/task-schedule'

// Refresh disabled slots while the planner stays open, including across midnight.
export function useCalendarClock() {
	const [now, setNow] = useState(() => localNow())
	useEffect(() => {
		const refresh = () => setNow(localNow())
		const timer = window.setInterval(refresh, 15000)
		window.addEventListener('focus', refresh)
		return () => {
			window.clearInterval(timer)
			window.removeEventListener('focus', refresh)
		}
	}, [])
	return now
}
