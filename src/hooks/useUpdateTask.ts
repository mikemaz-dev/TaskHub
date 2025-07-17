import { useQueryClient } from '@tanstack/react-query'

import { createClient } from '@/utils/supabase/client'

import type { ITask } from '@/types/tasks/task.types'

export const updateTask = async (taskId: number, taskData: Partial<ITask>) => {
	const supabase = createClient()
	const queryClient = useQueryClient()

	const { data, error } = await supabase
		.from('tasks')
		.update([taskData])
		.eq('id', taskId)
		.select('*')

	if (error) throw error

	queryClient.invalidateQueries({ queryKey: ['tasks'] })

	return data[0]
}
