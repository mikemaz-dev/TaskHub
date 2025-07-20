import type { TTask } from '@/types/tasks/task.types'

export interface ITaskStore {
	tasks: TTask[]

	// Actions
	loadFromServer: (tasks: TTask[]) => void
	addSubTask: (taskId: number, title: string) => void
	editTask: (id: number, taskData: Partial<TTask>) => void
}
