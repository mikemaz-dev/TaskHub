import { format, getHours, getMinutes } from 'date-fns'
import Image from 'next/image'

import { cn } from '@/utils/cn.util'
import { calculateTaskPosition } from '@/utils/timeline/timeline.util'

import type { ITask } from '@/types/tasks/task.types'

interface ITimelineSlotsProps {
	tasks: ITask[]
	time: string
}

export function TimeSlotItem({ tasks, time }: ITimelineSlotsProps) {
	const hour = parseInt(time.replace(/[^0-9]/g, ''))

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
					'h-80 w-0.5 bg-neutral-100 transition-colors duration-300',
					nowTime === time && 'bg-blue-500/40'
				)}
			/>

			{tasks
				.slice(-3)
				.filter(task => {
					const taskHour = getHours(task.dueDate.startTime)
					return taskHour === hour
				})
				.map(task => (
					<div
						key={task.id}
						className='absolute left-1/12 z-50 flex transform flex-col gap-6 rounded-2xl bg-blue-300 p-4.5'
						style={{
							top: `${getMinutes(task.dueDate.startTime)}%`,
							width: `${calculateTaskPosition(task).width}dvh`
						}}
					>
						<div className='flex gap-2'>
							<div className='h-max rounded-full bg-violet-50 p-3 text-blue-500 dark:bg-neutral-700 dark:text-blue-300'>
								<task.icon size={22} />
							</div>
							<div className='flex flex-col gap-2'>
								<span className='truncate font-semibold whitespace-break-spaces text-white'>
									{task.title}
								</span>
								<p className='text-sm text-white'>
									{format(task.dueDate.startTime, 'H aaa')} -{' '}
									{format(task.dueDate.endTime, 'H aaa')}
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
				))}
		</div>
	)
}
