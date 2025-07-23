'use client'

import { type IconName } from 'lucide-react/dynamic'
import { DynamicIcon } from 'lucide-react/dynamic'
import Image from 'next/image'

import { formatDueDate } from '@/utils/date/date.utl'

import type { TTask } from '@/types/tasks/task.types'

export function TaskCardHeader({ task }: { task: TTask }) {
	return (
		<div className='flex items-start justify-between gap-2 md:flex 2xl:flex-col'>
			<div className='flex items-start gap-2.5'>
				<div className='rounded-full bg-blue-50 p-2.5 text-blue-500 dark:bg-neutral-700 dark:text-blue-300'>
					<DynamicIcon
						name={task.icon as IconName}
						size={27}
					/>
				</div>
				<div className='flex flex-col gap-0.5'>
					<h3 className='font-bold 2xl:text-sm'>{task.title}</h3>
					<p className='mt-1 text-sm font-semibold opacity-80'>{formatDueDate(task.due_date)}</p>
				</div>
			</div>
			<div className='flex -space-x-2'>
				{task.task_participants
					?.filter(u => Boolean(u.profile))
					.slice(0, 3)
					.map((user, index) => (
						<Image
							key={user.profile.id}
							alt={user.profile.name || 'User avatar'}
							src={
								user.profile.avatar_path ? user.profile.avatar_path : '/images/default-avatar.png'
							}
							width={32}
							height={32}
							className='rounded-full border border-white shadow-sm dark:border-neutral-600'
							style={{ zIndex: 10 - index }}
						/>
					))}
				{task.task_participants?.length > 3 && (
					<div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-medium text-gray-600'>
						+{task.task_participants?.length - 3}
					</div>
				)}
			</div>
		</div>
	)
}
