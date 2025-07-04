'use client'

import { Pencil, Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui'
import { EditTaskModal } from '@/components/ui/task-card'

import type { ITask } from '@/types/tasks/task.types'

export function TaskCardActions({ task }: { task: ITask }) {
	const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false)

	return (
		<div className='relative flex items-center gap-2.5'>
			{isEditTaskModalOpen && (
				<EditTaskModal
					task={task}
					setIsOpen={setIsEditTaskModalOpen}
				/>
			)}
			<Button
				variant='default'
				className='rounded-full'
			>
				<Plus size={18} />
			</Button>
			<Button
				variant='secondary'
				className='border-primary rounded-full p-2'
				onClick={() => setIsEditTaskModalOpen(true)}
			>
				<Pencil size={16} />
			</Button>
		</div>
	)
}
