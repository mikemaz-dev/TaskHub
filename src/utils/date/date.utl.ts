import { differenceInDays, format, isToday, isTomorrow, startOfDay } from 'date-fns'

export function getDaysUntilDue(dueDate: Date): number {
	const today = startOfDay(new Date())
	const due = startOfDay(dueDate)
	return differenceInDays(due, today)
}

export function formatDueDate(dueDate: Date): string {
	const daysUntil = getDaysUntilDue(dueDate)
	const dueDateObj = new Date(dueDate)
	const overdueDays = Math.abs(daysUntil)

	if (isToday(dueDateObj)) {
		return 'Due: Today'
	}

	if (isTomorrow(dueDateObj)) {
		return 'Due: Tomorrow'
	}

	if (daysUntil < 0) {
		return `Overdue: ${overdueDays} day${overdueDays === 1 ? '' : 's'}`
	}

	if (daysUntil <= 7) {
		return `Due: ${daysUntil} day${overdueDays === 1 ? '' : 's'}`
	}

	return `Due: ${format(dueDateObj, 'MMM d')}`
}

export const FormatMinutes = (totalMinutes: number): string => {
	const hours = Math.floor(totalMinutes / 60)
	const minutes = totalMinutes % 60
	return `${hours}h ${minutes}m`
}
