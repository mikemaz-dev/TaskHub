import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import type { ITask } from '@/types/tasks/task.types'
import { type TTaskFormData, TaskSchema } from '@/zod-schemes/task.zod'

export const useEditTaskForm = ({ task }: { task: ITask }) => {
	const form = useForm<TTaskFormData>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			title: task.title,
			dueDate: {
				date: task.dueDate.date,
				startTime: task.dueDate.startTime,
				endTime: task.dueDate.endTime
			},
			icon: task.icon.name || 'Plane'
		}
	})

	const onSubmit = (data: TTaskFormData) => {
		if (data === task) {
			toast.error('Please fill some data to task', {
				id: 'empty-task-data',
				position: 'bottom-left',
				duration: 3500
			})
			return null
		}

		form.reset({
			title: task.title,
			dueDate: {
				date: data.dueDate.date,
				startTime: data.dueDate.startTime,
				endTime: data.dueDate.endTime
			},
			icon: data.icon
		})

		toast.success('Task updated successfully!', {
			description: `"${data.title}" task has been updated`,
			position: 'bottom-left',
			duration: 3500
		})
	}

	return {
		form,
		onSubmit
	}
}
