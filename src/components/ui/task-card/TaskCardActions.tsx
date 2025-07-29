'use client'

import { Pencil } from 'lucide-react'
import { useState } from 'react'

import { AddSubtaskModal } from '@/components/modals/subtask/AddSubtaskModal'
import { EditTaskModal } from '@/components/modals/task/EditTaskModal'
import { Button } from '@/components/ui'
import { PlusIcon } from '@/components/ui/icons/plus'

import type { TTask } from '@/types/tasks/task.types'

export function TaskCardActions({ task }: { task: TTask }) {
	const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false)
	const [isAddSubtaskModalOpen, setIsAddSubtaskModalOpen] = useState(false)

	return (
		<div className='relative flex items-center gap-2.5'>
			{isEditTaskModalOpen && (
				<EditTaskModal
					task={task}
					setIsOpen={setIsEditTaskModalOpen}
				/>
			)}
			{isAddSubtaskModalOpen && (
				<AddSubtaskModal
					setIsOpen={setIsAddSubtaskModalOpen}
					taskId={task.id}
				/>
			)}
			<Button
				variant='default'
				size='icon'
				className='text-foreground rounded-full'
				onClick={() => setIsAddSubtaskModalOpen(true)}
				aria-label={`Add subtask to ${task.title} task`}
			>
				<PlusIcon className='text-foreground' />
			</Button>
			<Button
				variant='outline'
				size='icon'
				className='border-primary rounded-full p-2'
				onClick={() => setIsEditTaskModalOpen(true)}
				aria-label={`Edit ${task.title} task`}
			>
				<Pencil className='text-foreground' />
			</Button>
		</div>
	)
}
