'use client'

import { useState } from 'react'

import { EditTaskModalContent } from '@/components/modals/EditTaskModalContent'
import { Button, Form, IconSelector, Modal, SectionHeading } from '@/components/ui'

import { useEditTaskForm } from '@/hooks/useEditTaskForm'

import type { ITask } from '@/types/tasks/task.types'

interface IEditTaskModal {
	setIsOpen: (isOpen: boolean) => void
	task: ITask
}

export function EditTaskModal({ setIsOpen, task }: IEditTaskModal) {
	const [selectedIcon, setSelectedIcon] = useState<string>(task.icon.name || '')
	const { form, onSubmit } = useEditTaskForm({ task })

	return (
		<Modal onClose={() => setIsOpen(false)}>
			<div className='flex flex-col gap-5'>
				<SectionHeading title='Edit Task' />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-7'
					>
						<EditTaskModalContent form={form} />

						<div className='flex flex-col gap-2'>
							<label className='text-sm font-medium'>Icon</label>
							<IconSelector
								selectedIcon={selectedIcon}
								onSelect={setSelectedIcon}
								placeholder={<task.icon size={24} />}
							/>
						</div>
						<div className='mt-4'>
							<Button
								variant='default'
								type='submit'
							>
								Save
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</Modal>
	)
}
