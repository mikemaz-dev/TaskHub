import { getHours, getMinutes } from 'date-fns'

import type { TGetTaskResponse } from '@/types/tasks/task.types'

export function calculateTaskPosition(task: TGetTaskResponse): {
	left: number
	width: number
	right: number
} {
	const startTime = `${task.due_date}T${task.start_time}`
	const endTime = `${task.due_date}T${task.end_time}`

	const startHour = getHours(new Date(startTime))
	const startMinute = getMinutes(new Date(endTime))
	const endHour = getHours(new Date(endTime))
	const endMinute = getMinutes(new Date(endTime))

	const startDecimal = startHour + startMinute / 60
	const endDecimal = endHour + endMinute / 60

	const hoursInDay = 17 - 9

	if (startDecimal < 9 || endDecimal > 17) {
		return { left: 0, width: 0, right: 100 }
	}

	const left = Math.round(((startDecimal - 9) / hoursInDay) * 100)
	const width = Math.round(((endDecimal - startDecimal) / hoursInDay) * 100)
	const right = Math.round(100 - ((endDecimal - 9) / hoursInDay) * 100)

	return {
		left: Math.max(0, Math.min(left, 100)),
		width: Math.max(0, Math.min(width, 100)),
		right: Math.max(0, Math.min(right, 100))
	}
}
