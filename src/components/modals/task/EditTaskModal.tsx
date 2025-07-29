'use client'

import { EditTaskModalContent } from '@/components/modals/task/EditTaskModalContent'
import { EditTaskModalIconSelector } from '@/components/modals/task/EditTaskModalIconSelector'
import { useEditTaskForm } from '@/components/modals/task/useEditTaskForm'
import { Button, Form, Modal } from '@/components/ui'
import SectionHeading from '@/components/ui/SectionHeading'

import { type TTask } from '@/types/tasks/task.types'

interface Props {
	setIsOpen: (isOpen: boolean) => void
	task: TTask
}

export function EditTaskModal({ setIsOpen, task }: Props) {
	const { form, isPending, onSubmit } = useEditTaskForm({
		taskId: task.id,
		onClose: () => setIsOpen(false)
	})

	return (
		<Modal onClose={() => setIsOpen(false)}>
			<div className='flex flex-col gap-5'>
				<SectionHeading title={`Edit task: '${task.title}'`} />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-8'
					>
						<EditTaskModalContent form={form} />

						<EditTaskModalIconSelector control={form.control} />

						<Button
							variant='default'
							type='submit'
							disabled={isPending}
							className='w-max'
						>
							{form.formState.isSubmitting ? 'Updating...' : 'Update task'}
						</Button>
					</form>
				</Form>
			</div>
		</Modal>
	)
}
