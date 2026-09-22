import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { clientCreateTask, clientTaskUpdate } from '@/services/tasks/task-client.service'
import type { TTaskCreate } from '@/types/tasks/task.types'

export function useSaveTask(
	mode: 'create' | 'edit',
	taskId: string | undefined,
	onClose: () => void
) {
	const router = useRouter()
	const cache = useQueryClient()
	return useMutation({
		mutationKey: ['task', mode, taskId],
		mutationFn: (data: TTaskCreate) =>
			mode === 'create' ? clientCreateTask(data) : clientTaskUpdate(taskId!, data),
		onSuccess: () => {
			toast.success(mode === 'create' ? 'Task created successfully' : 'Task updated successfully')
			onClose()
			router.refresh()
			void cache.invalidateQueries({ queryKey: ['task'] })
			void cache.invalidateQueries({ queryKey: ['task-search'] })
		},
		onError: () => toast.error('Could not save the task. Check your permissions and try again.')
	})
}
