import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { TASKS_DATA } from '@/data/tasks'
import type { ITask, TTaskFormData } from '@/types/tasks/task.types'
import { TaskSchema } from '@/zod-schemes/task.zod'

export const useEditTaskForm = ({ task }: { task: ITask }) => {
	const thisTask = task.id

	const form = useForm<TTaskFormData, any, undefined>({
		resolver: zodResolver(TaskSchema)
	})

	useEffect(() => {
		form.reset(TASKS_DATA.find(task => task.id === thisTask) || {})
	}, [task.id])

	const onSubmit = (values: TTaskFormData) => {
		console.log(values)
	}

	return {
		form,
		onSubmit
	}
}
