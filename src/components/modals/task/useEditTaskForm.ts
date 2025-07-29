import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { clientGetTaskById, clientTaskUpdate } from '@/services/tasks/task-client.service'
import type { TTaskUpdate } from '@/types/tasks/task.types'
import { type TTaskFormData, TaskSchema } from '@/zod-schemes/task.zod'

export const useEditTaskForm = ({ taskId, onClose }: { taskId: string; onClose: () => void }) => {
	const form = useForm<TTaskFormData>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			title: '',
			due_date: '',
			start_time: '',
			end_time: '',
			icon: ''
		}
	})

	const { isSuccess, data, isLoading, error } = useQuery({
		queryKey: ['task', taskId],
		queryFn: () => clientGetTaskById(taskId)
	})

	useEffect(() => {
		if (isLoading) return

		if (error) {
			toast.error('Task not found', {
				id: 'no-task-data'
			})
			return
		}

		if (isSuccess && data) {
			form.reset({
				title: data.title,
				due_date: data.due_date,
				start_time: data.start_time ?? '',
				end_time: data.end_time ?? '',
				icon: data.icon ?? ''
			})
		}
	}, [isSuccess, isLoading, data, form, error])

	const queryClient = useQueryClient()

	const { mutate, isPending, isError } = useMutation({
		mutationKey: ['task', 'update', taskId],
		mutationFn: (data: TTaskUpdate) => clientTaskUpdate(taskId, data),
		onSuccess: () => {
			toast.success('Task updated successfully')
			onClose()
			queryClient.invalidateQueries({ queryKey: ['task'] })
		},
		onError: error => {
			toast.error('Failed to update task')
			console.error('Error updating task:', error)
		}
	})

	if (isError) {
		console.warn('Error updating task')
	}

	const onSubmit: SubmitHandler<TTaskFormData> = data => {
		mutate({
			title: data.title,
			due_date: format(data.due_date, 'y-MM-d'),
			start_time: data.start_time,
			end_time: data.end_time,
			icon: data.icon
		})
	}

	return {
		form,
		isPending,
		onSubmit
	}
}
