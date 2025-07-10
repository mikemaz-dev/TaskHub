import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useTaskStore } from '@/store/task.store'

import { SubtaskSchema, type TSubtaskFormData } from '@/zod-schemes/sub-task.zod'

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
		if (!data.title.trim()) {
			toast.error('Please enter subtask title', {
				id: 'empty-subtask-title',
				position: 'bottom-left',
				duration: 3500
			})
			return null
		}

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
