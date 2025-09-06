'use client'

import { DynamicIcon, type IconName } from 'lucide-react/dynamic'

import { formatDueDate } from '@/utils/date/date.utl'

import { TaskCardUsers } from './TaskCardUsers'
import type { TTask } from '@/types/tasks/task.types'

export function TaskCardHeader({ task }: { task: TTask }) {
	return (
		<div className='flex items-start justify-between gap-2 md:flex 2xl:flex-col'>
			<div className='flex items-center gap-2.5'>
				<div className='rounded-full bg-blue-50 p-2.5 text-blue-500 dark:bg-neutral-700 dark:text-blue-300'>
					<DynamicIcon
						name={task.icon as IconName}
						size={25}
					/>
				</div>
				<div className='flex flex-col gap-0.5'>
					<h3 className='text-foreground font-bold 2xl:text-sm'>{task.title}</h3>
					<p className='text-foreground mt-1 text-sm font-semibold opacity-80'>
						{formatDueDate(task.due_date)}
					</p>
				</div>
			</div>
			<TaskCardUsers task={task} />
		</div>
	)
}
