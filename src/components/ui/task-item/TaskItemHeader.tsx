import Image from 'next/image'

import { formatDueDate } from '@/utils/date.utl'

import type { ITask } from '@/types/tasks/task.types'

export function TaskItemHeader({ task }: { task: ITask }) {
	return (
		<div className='flex items-start justify-between gap-2'>
			<div className='flex items-start gap-2.5'>
				<div className='p-4 rounded-full bg-blue-50 dark:bg-neutral-700 dark:text-blue-300 text-blue-500'>
					<task.icon
						size={20}
						absoluteStrokeWidth
					/>
				</div>
				<div className='flex flex-col gap-0.5'>
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
	)
}
