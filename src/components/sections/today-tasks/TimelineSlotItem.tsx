import { format } from 'date-fns'

import { cn } from '@/utils/cn.util'

import TimelineTask from './TimelineTask'
import type { TTask } from '@/types/tasks/task.types'

interface ITimelineSlotsProps {
	tasks: TTask[]
	time: string
}

export function TimelineSlotItem({ tasks, time }: ITimelineSlotsProps) {
	const nowTime = format(new Date(), 'h aaa')
	return (
		<div className='group relative flex flex-col items-center gap-2'>
			<span
				className={cn(
					'text-foreground text-sm font-semibold opacity-60',
					nowTime === time && 'text-primary font-bold opacity-100'
				)}
			>
				{time}
			</span>

			<div
				className={cn(
					'h-80 w-0.5 bg-neutral-100 transition-colors duration-300 dark:bg-neutral-600',
					nowTime === time && 'bg-primary dark:bg-primary'
				)}
			/>

			{tasks?.map(task => (
				<TimelineTask
					key={task.id}
					task={task}
				/>
			))}
		</div>
	)
}
