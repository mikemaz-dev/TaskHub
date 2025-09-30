'use client'

import { Button, Form, Modal } from '@/components/ui'
import DropdownButton from '@/components/ui/DropdownButton'
import SectionHeading from '@/components/ui/SectionHeading'

import { TaskModalIconSelector } from './EditTaskModalIconSelector'
import { TaskModalContent } from './TaskModalContent'
import { useProjects } from './useProjects'
import { useTaskForm } from './useTaskForm'
import { TTask } from '@/types/tasks/task.types'

interface ITaskModalProps {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	mode: 'create' | 'edit'
	task?: TTask
}

export function TaskModal({ isOpen, setIsOpen, mode, task }: ITaskModalProps) {
	const { form, isPending, onSubmit } = useTaskForm({
		mode,
		taskId: task?.id,
		onClose: () => setIsOpen(false)
	})

	const { data } = useProjects()

	if (!data) return []

	const getTitle = () => (mode === 'create' ? 'Create new task' : `Edit task: '${task?.title}'`)
	const getButtonText = () =>
		form.formState.isSubmitting
			? mode === 'create'
				? 'Creating...'
				: 'Updating...'
			: mode === 'create'
				? 'Create task'
				: 'Update task'

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
		>
			<div className='flex flex-col gap-5'>
				<SectionHeading title={getTitle()} />

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-8'
					>
						<TaskModalContent form={form} />
						<TaskModalIconSelector control={form.control} />

						<div className='flex items-center justify-between gap-4'>
							<DropdownButton
								placeholder={isPending ? 'Loading...' : 'Select project'}
								items={data}
								onSelect={() => console.log('Project selected')}
							/>

							<Button
								variant='default'
								type='submit'
								disabled={isPending}
							>
								{getButtonText()}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</Modal>
	)
}
