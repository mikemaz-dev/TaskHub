import { Link2, Image as LucideImage, MessageSquareText, Pencil, Plus } from 'lucide-react'
import Image from 'next/image'
import type { ReactNode } from 'react'

import { formatDueDate } from '@/utils/date.utl'

import type { ITask } from '@/types/tasks/task.types'

interface ILastTasksItem {
	task: ITask
	icon: ReactNode
}

export function TaskItem({ task, icon }: ILastTasksItem) {
	const completedSubtasks = task.subTasks.filter(subtask => subtask.isCompleted).length
	const totalSubtasks = task.subTasks.length
	const progressPercentage =
		totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0

	return (
		<div className='bg-white dark:bg-neutral-800 shadow-sm rounded-3xl p-4 pb-4 flex flex-col gap-2 justify-center overflow-hidden'>
			<div className='flex flex-col gap-2'>
				<div className='flex items-start justify-between'>
					<div className='flex items-start gap-3'>
						<div className='p-4 rounded-full bg-blue-50 dark:bg-neutral-700 dark:text-blue-300 text-blue-500'>
							{icon}
						</div>
						<div className='flex flex-col gap-1'>
							<h3 className='font-bold'>{task.title}</h3>
							<p className='text-sm mt-1 font-semibold opacity-80'>{formatDueDate(task.dueDate)}</p>
						</div>
					</div>

					<div className='flex -space-x-2'>
						{task.users.slice(0, 3).map((user, index) => (
							<Image
								key={user.id}
								alt={user.name}
								src={user.avatar ? user.avatar : '/images/default-avatar.png'}
								width={32}
								height={32}
								className='rounded-full border border-white dark:border-neutral-600 shadow-sm'
								style={{ zIndex: 10 - index }}
							/>
						))}
						{task.users.length > 3 && (
							<div className='w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600'>
								+{task.users.length - 3}
							</div>
						)}
					</div>
				</div>

				<div className='font-semibold text-lg'>Progress: {progressPercentage}%</div>
			</div>

			<div className='flex items-center justify-between'>
				{/* Stats */}
				<div className='flex items-center gap-4'>
					<div className='flex items-center justify-center gap-1'>
						<MessageSquareText
							size={16}
							className='opacity-70'
						/>
						<span className='text-sm font-semibold'>{task.comments.length}</span>
					</div>
					<div className='flex items-center justify-center gap-1'>
						<LucideImage
							size={16}
							className='opacity-70'
						/>
						<span className='text-sm font-semibold'>{task.resources.length}</span>
					</div>
					<div className='flex items-center gap-1'>
						<Link2
							size={16}
							className='opacity-70'
						/>
						<span className='text-sm font-semibold'>{task.links.length}</span>
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<button className='bg-violet-500 p-2 rounded-full text-white'>
						<Plus size={18} />
					</button>
					<button className='p-2 rounded-full border-2 border-violet-500 text-violet-500'>
						<Pencil size={16} />
					</button>
				</div>
			</div>
		</div>
	)
}
