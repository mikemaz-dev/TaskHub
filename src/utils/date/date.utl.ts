import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.extend(isToday)
dayjs.extend(isTomorrow)

export function getDaysUntilDue(dueDate: Date): number {
	const today = dayjs().startOf('day')
	const due = dayjs(dueDate).startOf('day')
	return due.diff(today, 'day')
}

export function formatDueDate(dueDate: Date): string {
	const daysUntil = getDaysUntilDue(dueDate)
	const dueDateObj = dayjs(dueDate)

	if (dueDateObj.isToday()) {
		return 'Due: Today'
	}

	if (dueDateObj.isTomorrow()) {
		return 'Due: Tomorrow'
	}

	if (daysUntil < 0) {
		const overdueDays = Math.abs(daysUntil)
		return `Overdue: ${overdueDays} day${overdueDays === 1 ? '' : 's'}`
	}

	if (daysUntil <= 7) {
		return `Due: ${daysUntil} day${daysUntil === 1 ? '' : 's'}`
	}

	return `Due: ${dueDateObj.format('MMM D')}`
}
