import { useQueryClient } from '@tanstack/react-query'

import { createClient } from '@/utils/supabase/client'

import type { ITask } from '@/types/tasks/task.types'

export const addTask = async (taskData: ITask) => {
	const supabase = createClient()
	const queryClient = useQueryClient()
	const { data, error } = await supabase.from('tasks').insert([taskData]).select('*')

	if (error) throw error

	queryClient.invalidateQueries({ queryKey: ['tasks'] })

	return data[0]
}
