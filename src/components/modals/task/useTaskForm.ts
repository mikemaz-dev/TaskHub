import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useWorkSchedule } from '@/components/workspace/availability/WorkScheduleProvider'
import { workHoursError } from '@/utils/work-hours'
import { scheduleError } from '@/utils/task-schedule'

import { useSaveTask } from './useSaveTask'
import { clientGetTaskById } from '@/services/tasks/task-client.service'
import { type TTaskFormData, TaskSchema } from '@/zod-schemes/task.zod'

interface UseTaskFormProps {
	mode: 'create' | 'edit'
	taskId?: string
	projectId?: string
	initialDate?: string
	initialTime?: string
	onClose: () => void
}

export const useTaskForm = ({
	mode,
	taskId,
	projectId,
	initialDate,
	initialTime,
	onClose
}: UseTaskFormProps) => {
	const workSchedule = useWorkSchedule()
	const form = useForm<TTaskFormData>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			title: '',
			due_date: initialDate ?? '',
			start_time: initialTime ?? '',
			end_time: '',
			icon: 'check-circle',
			project_id: projectId ?? '',
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
				icon: data.icon ?? 'check-circle',
				project_id: data.project_id ?? '',
				participants: data.task_participants.map(p => p.profile.id)
			})
		}
	}, [isSuccess, isLoading, data, form, error, mode])

	const { mutate: saveTask, isPending } = useSaveTask(mode, taskId, onClose)

	const previous = data
	const onSubmit: SubmitHandler<TTaskFormData> = data => {
		const formattedData = {
			title: data.title,
			due_date: format(data.due_date, 'yyyy-MM-dd'),
			start_time: data.start_time || null,
			end_time: data.end_time || null,
			icon: data.icon,
			project_id: data.project_id,
			participants: data.participants
		}

		const changed = mode === 'create' || previous?.due_date !== data.due_date || (previous?.start_time || '').slice(0, 5) !== data.start_time.slice(0, 5) || (previous?.end_time || '').slice(0, 5) !== data.end_time.slice(0, 5)
		const issue = changed && (scheduleError(formattedData.due_date, data.start_time) || workHoursError(formattedData.due_date, data.start_time, data.end_time, workSchedule))
		if (issue) {
			form.setError(issue.field, { type: 'validate', message: issue.message })
			return
		}
		saveTask(formattedData)
	}

	return {
		form,
		isPending,
		isLoading,
		onSubmit
	}
}
