import { format, getMinutes } from 'date-fns'
import type { IconName } from 'lucide-react/dynamic'
import { DynamicIcon } from 'lucide-react/dynamic'

import { cn } from '@/utils/cn.util'
import { calculateTaskPosition } from '@/utils/timeline/timeline.util'

import type { TTask } from '@/types/tasks/task.types'

interface ITimelineSlotsProps {
	tasks: TTask[]
	time: string
}

export function TimeSlotItem({ tasks, time }: ITimelineSlotsProps) {
	const nowTime = format(new Date(), 'h aaa')

	return (
		<div className='group relative flex flex-col items-center gap-2'>
			<span
				className={cn(
					'text-sm font-semibold opacity-60',
					nowTime === time && 'font-bold text-blue-600'
				)}
			>
				{time}
			</span>

			<div
				className={cn(
					'h-80 w-0.5 bg-neutral-100 transition-colors duration-300 dark:bg-neutral-700',
					nowTime === time && 'bg-blue-500/40'
				)}
			/>

			{tasks.map(task => {
				const startTime = `${task.due_date}T${task.start_time}`
				const endTime = `${task.due_date}T${task.end_time}`

				return (
					<div
						key={task.id}
						className='absolute left-1/12 z-50 flex transform flex-col gap-6 rounded-2xl bg-blue-300 p-4.5 dark:bg-blue-500'
						style={{
							top: `${getMinutes(startTime)}%`,
							width: `${calculateTaskPosition(task).width}dvh`
						}}
					>
						<div className='flex gap-2.5'>
							<div className='h-max rounded-full bg-violet-50 p-3 text-blue-500 dark:bg-neutral-700 dark:text-blue-300'>
								<DynamicIcon name={task.icon as IconName} />
							</div>
							<div className='flex flex-col gap-0.5'>
								<span className='truncate font-bold whitespace-break-spaces text-white'>
									{task.title}
								</span>
								<p className='text-sm text-white'>
									{format(startTime, 'H aaa')} - {format(endTime, 'H aaa')}
								</p>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}
