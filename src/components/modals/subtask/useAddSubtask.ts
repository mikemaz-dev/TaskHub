import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { clientCreateSubTask } from '@/services/tasks/task-client.service'
import type { TSubTaskCreate } from '@/types/tasks/task.types'
import { SubtaskSchema, type TSubtaskFormData } from '@/zod-schemes/sub-task.zod'

export const useAddSubtask = ({
	taskId,
	setIsOpen
}: {
	taskId: string
	setIsOpen: (isOpen: boolean) => void
}) => {
	const form = useForm<TSubtaskFormData>({
		resolver: zodResolver(SubtaskSchema),
		defaultValues: {
			title: ''
		}
	})

	const queryClient = useQueryClient()

	const { mutate, isPending, isError } = useMutation({
		mutationKey: ['sub_task', 'create'],
		mutationFn: (data: TSubTaskCreate) => clientCreateSubTask(taskId, data),
		onSuccess: () => {
			toast.success('Task updated successfully')
			setIsOpen(false)
			queryClient.invalidateQueries({ queryKey: ['sub_task'] })
		},
		onError: error => {
			toast.error('Failed to create subtask')
			console.error('Error creating subtask:', error)
		}
	})

	if (isError) {
		console.warn('Error updating task')
	}

	const onSubmit = (data: TSubtaskFormData) => {
		if (!data.title.trim()) {
			toast.error('Please enter subtask title', {
				id: 'empty-subtask-title',
				position: 'bottom-left',
				duration: 3500
			})
			return null
		}

		mutate(data)
		form.reset({ title: '' })
		setIsOpen(false)

		toast.success('Subtask added successfully!', {
			description: `"${data.title}" subtask has been added`,
			position: 'bottom-left',
			duration: 3500
		})
	}

	return {
		form,
		isPending,
		onSubmit
	}
}
