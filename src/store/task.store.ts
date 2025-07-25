import { create } from 'zustand/react'

import type { ITaskStore } from '@/store/interfaces/task-store.interface'

export const useTaskStore = create<ITaskStore>()(set => ({
	tasks: [],

	loadFromServer: tasks => {
		return tasks
	}
}))
