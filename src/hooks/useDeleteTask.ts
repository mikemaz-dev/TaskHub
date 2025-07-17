import { useQueryClient } from '@tanstack/react-query'

import { createClient } from '@/utils/supabase/client'

export const deleteTask = async (taskId: number) => {
	const supabase = createClient()
	const queryClient = useQueryClient()

	const { error } = await supabase.from('tasks').delete().eq('id', taskId)

	if (error) throw error

	queryClient.invalidateQueries({ queryKey: ['tasks'] })
}
