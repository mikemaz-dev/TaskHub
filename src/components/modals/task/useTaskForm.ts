import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	clientCreateTask,
	clientGetTaskById,
	clientTaskUpdate
} from '@/services/tasks/task-client.service'
import type { TTaskCreate, TTaskUpdate } from '@/types/tasks/task.types'
import { type TTaskFormData, TaskSchema } from '@/zod-schemes/task.zod'

interface UseTaskFormProps {
	mode: 'create' | 'edit'
	taskId?: string
	onClose: () => void
}

export const useTaskForm = ({ mode, taskId, onClose }: UseTaskFormProps) => {
	const form = useForm<TTaskFormData>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			title: '',
			due_date: '',
			start_time: '',
			end_time: '',
			icon: '',
			participants: []
		}
	})

	const { isSuccess, data, isLoading, error } = useQuery({
		queryKey: ['task', taskId],
		queryFn: () => clientGetTaskById(taskId!),
		enabled: mode === 'edit' && !!taskId
	})

	useEffect(() => {
		if (mode !== 'edit' || isLoading) return

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
				icon: data.icon ?? '',
				participants: data.task_participants.map(p => p.profile.id)
			})
		}
	}, [isSuccess, isLoading, data, form, error, mode])

	const queryClient = useQueryClient()

	const { mutate: createTask, isPending: isCreating } = useMutation({
		mutationKey: ['task', 'create'],
		mutationFn: (data: TTaskCreate) => clientCreateTask(data),
		onSuccess: () => {
			toast.success('Task created successfully')
			onClose()
			queryClient.invalidateQueries({ queryKey: ['task'] })
		},
		onError: error => {
			const errorMessage = error instanceof Error ? error.message : 'Failed to create task'
			toast.error(
				errorMessage.includes('row-level security')
					? 'You do not have permission to create this task'
					: 'Failed to create task'
			)
			console.error('Error creating task:', error)
		}
	})

	const { mutate: updateTask, isPending: isUpdating } = useMutation({
		mutationKey: ['task', 'update', taskId],
		mutationFn: (data: TTaskUpdate) => clientTaskUpdate(taskId!, data),
		onSuccess: () => {
			toast.success('Task updated successfully')
			onClose()
			queryClient.invalidateQueries({ queryKey: ['task'] })
		},
		onError: error => {
			const errorMessage = error instanceof Error ? error.message : 'Failed to update task'
			toast.error(
				errorMessage.includes('row-level security')
					? 'You do not have permission to update this task'
					: 'Failed to update task'
			)
			console.error('Error updating task:', error)
		}
	})

	const isPending = isCreating || isUpdating

	const onSubmit: SubmitHandler<TTaskFormData> = data => {
		console.log('Form submitted!', data)
		const formattedData = {
			title: data.title,
			due_date: format(data.due_date, 'y-MM-d'),
			start_time: data.start_time,
			end_time: data.end_time,
			icon: data.icon,
			participants: data.participants
		}

		if (mode === 'create') {
			createTask(formattedData as TTaskCreate & { participants: string[] })
		} else {
			updateTask(formattedData as TTaskUpdate & { participants: string[] })
		}
	}

	return {
		form,
		isPending,
		onSubmit
	}
}
