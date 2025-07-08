import { getHours, getMinutes } from 'date-fns'

import type { ITask } from '@/types/tasks/task.types'

export const calculateTaskPosition = (
	task: ITask,
	startTime: number = 9,
	endTime: number = 17
): { left: number; width: number; right: number } => {
	const startHour = getHours(task.dueDate.startTime)
	const startMinute = getMinutes(task.dueDate.startTime)
	const endHour = getHours(task.dueDate.endTime)
	const endMinute = getMinutes(task.dueDate.endTime)

	const startDecimal = startHour + startMinute / 60
	const endDecimal = endHour + endMinute / 60

	const hoursInDay = endTime - startTime

	if (startDecimal < startTime || endDecimal > endTime) {
		return { left: 0, width: 0, right: 100 }
	}

	const left = ((startDecimal - startTime) / hoursInDay) * 100
	const width = ((endDecimal - startDecimal) / hoursInDay) * 100
	const right = 100 - ((endDecimal - startTime) / hoursInDay) * 100

	return { left, width, right }
}
