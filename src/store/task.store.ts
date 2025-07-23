import { create } from 'zustand/react'

import type { ITaskStore } from '@/store/interfaces/task-store.interface'

import { getIconByName, getNextSubTaskId } from '@/utils/store/tasks/tasks-store.util'

export const useTaskStore = create<ITaskStore>()(set => ({
	tasks: [],

	loadFromServer: tasks => {
		return tasks
	},

	addSubTask: (taskId, title) => {
		set(state => {
			const updatedTasks = state.tasks.map(task => {
				if (task.id === taskId) {
					const newSubTask = {
						id: getNextSubTaskId(task.sub_task),
						title,
						isCompleted: false
					}

					return {
						...task,
						subTasks: [...task.subTasks, newSubTask]
					}
				}
				return task
			})

			return { tasks: updatedTasks }
		})
	},

	editTask: (id, taskData) => {
		set(state => {
			const updatedTasks = state.tasks.map(task => {
				if (task.id === id) {
					return {
						...task,
						...taskData,
						icon:
							taskData.icon && typeof taskData.icon === 'string'
								? getIconByName(taskData.icon)
								: taskData.icon || task.icon
					}
				}
				return task
			})
			return { tasks: updatedTasks }
		})
	}
}))
