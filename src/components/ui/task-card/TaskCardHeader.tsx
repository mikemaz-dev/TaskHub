import Image from 'next/image'

import { formatDueDate } from '@/utils/date.utl'

import type { ITask } from '@/types/tasks/task.types'

export function TaskCardHeader({ task }: { task: ITask }) {
	return (
		<div className='flex items-start justify-between gap-2 md:flex 2xl:flex-col'>
			<div className='flex items-start gap-2.5'>
				<div className='rounded-full bg-blue-50 p-4 text-blue-500 dark:bg-neutral-700 dark:text-blue-300'>
					<task.icon
						size={20}
						absoluteStrokeWidth
					/>
				</div>
				<div className='flex flex-col gap-0.5'>
					<h3 className='font-bold 2xl:text-sm'>{task.title}</h3>
					<p className='mt-1 text-sm font-semibold opacity-80'>
						{formatDueDate(task.dueDate.date)}
					</p>
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
						className='rounded-full border border-white shadow-sm dark:border-neutral-600'
						style={{ zIndex: 10 - index }}
					/>
				))}
				{task.users.length > 3 && (
					<div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-medium text-gray-600'>
						+{task.users.length - 3}
					</div>
				)}
			</div>
		</div>
	)
}
