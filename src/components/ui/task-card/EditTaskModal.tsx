'use client'

import { PenIcon as UserPen } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Button, Field, Modal, SectionHeading } from '@/components/ui'
import { IconSelector } from '@/components/ui/IconSelector/IconSelector'

import type { ITask } from '@/types/tasks/task.types'

interface IEditTaskModal {
	setIsOpen: (isOpen: boolean) => void
	task: ITask
}

export function EditTaskModal({ setIsOpen, task }: IEditTaskModal) {
	const [selectedIcon, setSelectedIcon] = useState<string>(task.icon.name || '')
	return (
		<Modal onClose={() => setIsOpen(false)}>
			<div className='flex flex-col gap-5'>
				<SectionHeading title='Edit Task' />
				<div className='flex flex-col gap-3'>
					<div className='flex flex-col gap-4'>
						<Field
							label='Name'
							type='text'
							name='name'
							placeholder={task.title}
						/>
						<Field
							label='Due Date'
							type='date'
							name='date'
							defaultValue={task.dueDate.toISOString().split('T')[0]}
						/>
						<div className='flex flex-col gap-2'>
							<label className='text-lg font-medium text-neutral-500'>Icon</label>
							<IconSelector
								selectedIcon={selectedIcon}
								onSelect={setSelectedIcon}
								placeholder={<task.icon size={24} />}
							/>
						</div>
					</div>
					<div className='flex flex-col gap-3'>
						<span className='text-lg font-medium text-neutral-500'>Team:</span>
						<div className='flex items-center justify-between'>
							<div className='flex items-center -space-x-2'>
								{task.users.slice(0, 3).map((user, index) => (
									<Image
										key={user.id}
										alt={user.name}
										src={user.avatar ? user.avatar : '/images/default-avatar.png'}
										width={32}
										height={32}
										className='rounded-full border border-white shadow-sm dark:border-neutral-600'
										style={{ zIndex: 10 - index }}
									/>
								))}
							</div>
							<button className='cursor-pointer'>
								<UserPen className='hover:text-primary transform transition-all duration-300 hover:scale-105' />
							</button>
						</div>
					</div>
				</div>
				<div>
					<Button variant='primary'>Save</Button>
				</div>
			</div>
		</Modal>
	)
}
