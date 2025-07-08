import type { ITask } from '@/types/tasks/task.types'

export interface ITaskStore {
	tasks: ITask[]

	// Actions
	addSubTask: (taskId: number, title: string) => void
	editTask: (id: number, taskData: Partial<ITask>) => void
	getTodayTask: (tasks: ITask[]) => void
}
