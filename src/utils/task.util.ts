import { isDueSoon, isOverdue } from './date.utl'
import type { ITask } from '@/types/tasks/task.types'

/**
 * Calculate task completion percentage
 * @param task - The task object
 * @returns Completion percentage (0-100)
 */
export function getTaskCompletionPercentage(task: ITask): number {
	if (task.subTasks.length === 0) return 0

	const completedSubtasks = task.subTasks.filter(subtask => subtask.isCompleted).length
	return Math.round((completedSubtasks / task.subTasks.length) * 100)
}

/**
 * Get task priority based on due date and completion
 * @param task - The task object
 * @returns Priority level: 'high', 'medium', 'low'
 */
export function getTaskPriority(task: ITask): 'high' | 'medium' | 'low' {
	const completionPercentage = getTaskCompletionPercentage(task)

	if (isOverdue(task.dueDate)) {
		return 'high'
	}

	if (isDueSoon(task.dueDate) && completionPercentage < 50) {
		return 'high'
	}

	if (isDueSoon(task.dueDate) || completionPercentage < 25) {
		return 'medium'
	}

	return 'low'
}

/**
 * Sort tasks by priority and due date
 * @param tasks - Array of tasks
 * @returns Sorted array of tasks
 */
export function sortTasksByPriority(tasks: ITask[]): ITask[] {
	return [...tasks].sort((a, b) => {
		const priorityOrder = { high: 3, medium: 2, low: 1 }
		const aPriority = getTaskPriority(a)
		const bPriority = getTaskPriority(b)

		// First sort by priority
		if (priorityOrder[aPriority] !== priorityOrder[bPriority]) {
			return priorityOrder[bPriority] - priorityOrder[aPriority]
		}

		// Then by due date
		return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
	})
}

/**
 * Filter tasks by status
 * @param tasks - Array of tasks
 * @param status - Status to filter by
 * @returns Filtered array of tasks
 */
export function filterTasksByStatus(
	tasks: ITask[],
	status: 'overdue' | 'due-soon' | 'in-progress' | 'completed'
): ITask[] {
	return tasks.filter(task => {
		const completionPercentage = getTaskCompletionPercentage(task)

		switch (status) {
			case 'overdue':
				return isOverdue(task.dueDate)
			case 'due-soon':
				return isDueSoon(task.dueDate) && !isOverdue(task.dueDate)
			case 'in-progress':
				return completionPercentage > 0 && completionPercentage < 100
			case 'completed':
				return completionPercentage === 100
			default:
				return true
		}
	})
}
