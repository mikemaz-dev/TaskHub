export type WorkSchedule = { start: string; end: string; timezone: string; days: number[] }
export function readSchedule(value: unknown): WorkSchedule | null {
	if (!value || typeof value !== 'object') return null
	const v = value as WorkSchedule
	if (typeof v.timezone !== 'string' || !v.timezone) return null
	if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(v.start) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(v.end) || v.start === v.end) return null
	if (!Array.isArray(v.days) || !v.days.length || v.days.some(d => !Number.isInteger(d) || d < 0 || d > 6)) return null
	try { new Intl.DateTimeFormat('en', { timeZone: v.timezone }).format() } catch { return null }
	return v
}
const formatters = new Map<string, Intl.DateTimeFormat>()
export function isWorking(schedule: WorkSchedule, now: Date) {
	let formatter = formatters.get(schedule.timezone)
	if (!formatter) {
		formatter = new Intl.DateTimeFormat('en-US', { timeZone: schedule.timezone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
		formatters.set(schedule.timezone, formatter)
	}
	const parts = formatter.formatToParts(now)
	const part = (type: string) => parts.find(p => p.type === type)?.value || ''
	const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(part('weekday'))
	const time = `${part('hour')}:${part('minute')}`
	if (schedule.start < schedule.end) return schedule.days.includes(day) && time >= schedule.start && time < schedule.end
	// After midnight belongs to the shift that started on the previous day.
	return (schedule.days.includes(day) && time >= schedule.start) || (schedule.days.includes((day + 6) % 7) && time < schedule.end)
}
