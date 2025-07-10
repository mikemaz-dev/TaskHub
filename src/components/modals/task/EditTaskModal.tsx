'use client'

import { useState } from 'react'

import { Button, Form, IconSelector, Modal, SectionHeading } from '@/components/ui'

import { EditTaskModalContent } from './EditTaskModalContent'
import { useEditTaskForm } from './useEditTaskForm'
import { type ITask } from '@/types/tasks/task.types'
import { type TTaskFormData } from '@/zod-schemes/task.zod'

interface IEditTaskModal {
	setIsOpen: (isOpen: boolean) => void
	task: ITask
}

export function EditTaskModal({ setIsOpen, task }: IEditTaskModal) {
	const [selectedIcon, setSelectedIcon] = useState<string>(task.icon.name || '')
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
				<SectionHeading title={`Edit task #${task.id}`} />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className='flex flex-col gap-8'
					>
						<EditTaskModalContent form={form} />

						<div className='flex flex-col gap-2'>
							<label className='text-sm font-medium'>Icon</label>
							<IconSelector
								selectedIcon={selectedIcon}
								onSelect={iconName => {
									setSelectedIcon(iconName)
									form.setValue('icon', iconName)
								}}
								placeholder={<task.icon size={24} />}
							/>
						</div>
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
