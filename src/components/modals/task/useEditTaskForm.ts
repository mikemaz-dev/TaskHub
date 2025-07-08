import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useTaskStore } from '@/store/task.store'

import type { ITask } from '@/types/tasks/task.types'
import { type TTaskFormData, TaskSchema } from '@/zod-schemes/task.zod'

export const useEditTaskForm = ({ task }: { task: ITask }) => {
	const form = useForm<TTaskFormData>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			title: task.title,
			dueDate: task.dueDate,
			icon: task.icon.name || 'Plane'
		}
	})

	const editTask = useTaskStore(state => state.editTask)

	const onSubmit = (data: TTaskFormData) => {
		if (data === task) {
			toast.error('Please fill some data to task', {
				id: 'empty-task-datas',
				position: 'bottom-left',
				duration: 3500
			})
			return null
		}

		editTask(task.id, {
			title: data.title,
			dueDate: data.dueDate,
			icon: data.icon
		})

		form.reset({ title: task.title, dueDate: data.dueDate, icon: data.icon })

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
