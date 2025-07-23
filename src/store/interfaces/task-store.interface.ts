import type { TGetTasksResponse, TTask } from '@/types/tasks/task.types'

export interface ITaskStore {
	tasks: TGetTasksResponse[]

	// Actions
	loadFromServer: (tasks: TTask[]) => void
	addSubTask: (taskId: number, title: string) => void
	editTask: (id: number, taskData: Partial<TGetTasksResponse>) => void
}
