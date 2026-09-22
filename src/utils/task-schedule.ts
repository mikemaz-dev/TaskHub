import { format } from 'date-fns'

// Tasks use the user's local calendar and minute precision, not UTC dates.
export function localNow(now = new Date()) {
	return { date: format(now, 'yyyy-MM-dd'), time: format(now, 'HH:mm') }
}

export function scheduleError(date: string, time?: string | null) {
	const now = localNow()
	if (date < now.date) return { field: 'due_date' as const, message: 'Choose today or a future date.' }
	if (date === now.date && time && time.slice(0, 5) < now.time)
		return { field: 'start_time' as const, message: 'This time has passed. Choose Now or a later time.' }
	return null
}
