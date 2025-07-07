import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useTaskStore } from '@/store/task-store.store'

import { type TSubtaskFormData } from '@/types/tasks/sub-tasks.types'
import { SubtaskSchema } from '@/zod-schemes/sub-task.zod'

export const useAddSubtask = ({
	taskId,
	setIsOpen
}: {
	taskId: number
	setIsOpen: (isOpen: boolean) => void
}) => {
	const form = useForm<TSubtaskFormData>({
		resolver: zodResolver(SubtaskSchema),
		defaultValues: {
			title: ''
		}
	})

	const addSubTask = useTaskStore(state => state.addSubTask)

	const onSubmit = (data: TSubtaskFormData) => {
		addSubTask(taskId, data.title)
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
		onSubmit
	}
}
