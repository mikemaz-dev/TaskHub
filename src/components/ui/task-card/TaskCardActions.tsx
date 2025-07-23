'use client'

import { Pencil, Plus } from 'lucide-react'
import { useState } from 'react'

import { AddSubtaskModal } from '@/components/modals/subtask/AddSubtaskModal'
import { EditTaskModal } from '@/components/modals/task/EditTaskModal'
import { Button } from '@/components/ui'

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
				className='rounded-full'
				onClick={() => setIsAddSubtaskModalOpen(true)}
			>
				<Plus />
			</Button>
			<Button
				variant='outline'
				size='icon'
				className='border-primary rounded-full p-2'
				onClick={() => setIsEditTaskModalOpen(true)}
			>
				<Pencil />
			</Button>
		</div>
	)
}
