import { isWorking, type WorkSchedule } from '@/components/workspace/availability/work-schedule'

type Interval = { start: number; end: number }
const cache = new Map<string, Interval[]>()
export const minuteTime = (minute: number) => `${String(Math.floor(minute / 60)).padStart(2, '0')}:${String(minute % 60).padStart(2, '0')}`
export const timeMinute = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5))

// Existing tasks use browser-local times. Convert each candidate to the member's zone.
export function workIntervals(date: string, schedule: WorkSchedule | null): Interval[] {
	if (!schedule) return [{ start: 0, end: 1440 }]
	const key = `${date}:${JSON.stringify(schedule)}:${Intl.DateTimeFormat().resolvedOptions().timeZone}`
	const saved = cache.get(key)
	if (saved) return saved
	const result: Interval[] = []
	for (let minute = 0; minute < 1440; minute++) {
		const candidate = new Date(`${date}T${minuteTime(minute)}:00`)
		if (!isWorking(schedule, candidate)) continue
		const previous = result[result.length - 1]
		if (previous?.end === minute) previous.end++
		else result.push({ start: minute, end: minute + 1 })
	}
	if (cache.size > 100) cache.clear()
	cache.set(key, result)
	return result
}
export function workHoursError(date: string, start: string | null | undefined, end: string | null | undefined, schedule: WorkSchedule | null) {
	if (!schedule || !date) return null
	const intervals = workIntervals(date, schedule)
	if (!intervals.length) return { field: 'due_date' as const, message: 'This is outside your working days. Choose another date or update working hours in Settings.' }
	if (!start) return null
	const minute = timeMinute(start)
	const interval = intervals.find(i => minute >= i.start && minute < i.end)
	if (!interval) return { field: 'start_time' as const, message: 'Choose a start within your working hours. Times here use your device time zone.' }
	if (end && timeMinute(end) > interval.end) return { field: 'end_time' as const, message: `Your working period ends at ${minuteTime(interval.end)}. Shorten the task or update Settings.` }
	return null
}
export function availableSlot(date: string, hour: number, schedule: WorkSchedule | null) {
	const now = new Date()
	const today = new Date(`${date}T00:00:00`)
	const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
	if (today < currentDate) return null
	const minimum = today.getTime() === currentDate.getTime() ? now.getHours() * 60 + now.getMinutes() : 0
	for (const interval of workIntervals(date, schedule)) {
		const start = Math.max(hour * 60, interval.start, minimum)
		if (start < Math.min((hour + 1) * 60, interval.end)) return minuteTime(start)
	}
	return null
}
