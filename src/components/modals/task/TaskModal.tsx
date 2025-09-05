'use client'

import { EditTaskModalIconSelector } from '@/components/modals/task/EditTaskModalIconSelector'
import { TaskModalContent } from '@/components/modals/task/TaskModalContent'
import { useTaskForm } from '@/components/modals/task/useTaskForm'
import { Button, Form, Modal } from '@/components/ui'
import SectionHeading from '@/components/ui/SectionHeading'

import { type TTask } from '@/types/tasks/task.types'

interface ITaskModalProps {
	setIsOpen: (isOpen: boolean) => void
	mode: 'create' | 'edit'
	task?: TTask
}

export function TaskModal({ setIsOpen, mode, task }: ITaskModalProps) {
	const { form, isPending, onSubmit } = useTaskForm({
		mode,
		taskId: task?.id,
		onClose: () => setIsOpen(false)
	})

	const getTitle = () => {
		if (mode === 'create') {
			return 'Create new task'
		}
		return `Edit task: '${task?.title}'`
	}

	const getButtonText = () => {
		if (form.formState.isSubmitting) {
			return mode === 'create' ? 'Creating...' : 'Updating...'
		}
		return mode === 'create' ? 'Create task' : 'Update task'
	}

	return (
		<Modal onClose={() => setIsOpen(false)}>
			<div className='flex flex-col gap-5'>
				<SectionHeading title={getTitle()} />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-8'
					>
						<TaskModalContent form={form} />

						<EditTaskModalIconSelector control={form.control} />

						<Button
							variant='default'
							type='submit'
							disabled={isPending}
							className='w-max'
						>
							{getButtonText()}
						</Button>
					</form>
				</Form>
			</div>
		</Modal>
	)
}
