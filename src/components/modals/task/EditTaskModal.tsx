'use client'

import { useState } from 'react'

import {
	EditTaskModalContent,
	EditTaskModalIconSelector,
	useEditTaskForm
} from '@/components/modals/task'
import { Button, Form, Modal, SectionHeading } from '@/components/ui'

import { type TTask } from '@/types/tasks/task.types'
import { type TTaskFormData } from '@/zod-schemes/task.zod'

interface Props {
	setIsOpen: (isOpen: boolean) => void
	task: TTask
}

export function EditTaskModal({ setIsOpen, task }: Props) {
	const [selectedIcon] = useState<string>(task.icon || '')
	const { form, onSubmit } = useEditTaskForm({ task })

	const handleSubmit = (data: TTaskFormData) => {
		const formDataWithIcon = {
			...data,
			icon: selectedIcon
		}

		onSubmit(formDataWithIcon)
		setIsOpen(false)
	}

	return (
		<Modal onClose={() => setIsOpen(false)}>
			<div className='flex flex-col gap-5'>
				<SectionHeading title={`Edit task: '${task.title}'`} />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(() => handleSubmit)}
						className='flex flex-col gap-8'
					>
						<EditTaskModalContent form={form} />

						<EditTaskModalIconSelector
							task={task}
							form={form}
							selectedIcon={selectedIcon}
						/>

						<Button
							variant='default'
							type='submit'
							className='w-max'
						>
							{form.formState.isSubmitting ? 'Saving...' : 'Save'}
						</Button>
					</form>
				</Form>
			</div>
		</Modal>
	)
}
