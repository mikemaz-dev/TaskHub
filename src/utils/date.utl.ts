import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.extend(isToday)
dayjs.extend(isTomorrow)

/**
 * Calculate days until due date
 * @param dueDate - The due date
 * @returns Number of days until due date (negative if overdue)
 */
export function getDaysUntilDue(dueDate: Date): number {
	const today = dayjs().startOf('day')
	const due = dayjs(dueDate).startOf('day')
	return due.diff(today, 'day')
}

/**
 * Format due date for display
 * @param dueDate - The due date
 * @returns Formatted string for display
 */
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

	// For dates more than a week away, show the actual date
	return `Due: ${dueDateObj.format('MMM D')}`
}

/**
 * Get relative time from now
 * @param date - The date to compare
 * @returns Relative time string (e.g., "2 days ago", "in 3 days")
 */
export function getRelativeTime(date: Date): string {
	return dayjs(date).fromNow()
}

/**
 * Check if a task is overdue
 * @param dueDate - The due date
 * @returns True if the task is overdue
 */
export function isOverdue(dueDate: Date): boolean {
	return getDaysUntilDue(dueDate) < 0
}

/**
 * Check if a task is due soon (within 3 days)
 * @param dueDate - The due date
 * @returns True if the task is due within 3 days
 */
export function isDueSoon(dueDate: Date): boolean {
	const daysUntil = getDaysUntilDue(dueDate)
	return daysUntil >= 0 && daysUntil <= 3
}

/**
 * Format date for display in various formats
 * @param date - The date to format
 * @param format - The format string (default: 'MMM D, YYYY')
 * @returns Formatted date string
 */
export function formatDate(date: Date, format = 'MMM D, YYYY'): string {
	return dayjs(date).format(format)
}
