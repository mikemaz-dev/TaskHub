import { useQuery } from '@tanstack/react-query'

import { createClient } from '@/utils/supabase/client'

export function useTaskPermission(taskId?: string) {
	const permission = useQuery({
		queryKey: ['task-permission', taskId],
		queryFn: async () => {
			const { data, error } = await createClient().rpc('taskhub_edit_task', {
				task_input: taskId!
			})
			if (error) throw error
			return data
		},
		enabled: !!taskId
	})

	return permission
}
