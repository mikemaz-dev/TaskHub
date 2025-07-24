import { format, getMinutes } from 'date-fns'
import type { IconName } from 'lucide-react/dynamic'
import { DynamicIcon } from 'lucide-react/dynamic'
import Image from 'next/image'

import { cn } from '@/utils/cn.util'
import { calculateTaskPosition } from '@/utils/timeline/timeline.util'

import type { TTask } from '@/types/tasks/task.types'

interface ITimelineSlotsProps {
	tasks: TTask[]
	time: string
}

export function TimeSlotItem({ tasks, time }: ITimelineSlotsProps) {
	const nowTime = format(new Date(), 'h aaa')

	const normalizeTime = (time: string): string => {
		return time.replace(/\./g, ':')
	}

	const formatTime = (time: string): string => {
		const normalizedTime = normalizeTime(time)
		const date = new Date(normalizedTime)

		const hours = date.getHours()
		const minutes = date.getMinutes()

		const formattedHours = hours % 12 || 12

		if (minutes === 0) {
			return `${formattedHours} ${format(date, 'aaa')}`
		}

		return `${formattedHours}.${minutes} ${format(date, 'aaa')}`
	}
	return (
		<div className='group relative flex flex-col items-center gap-2'>
			<span
				className={cn(
					'text-sm font-semibold opacity-60',
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

			{tasks?.map(task => {
				const startTime = `${task.due_date}T${task.start_time}`
				const endTime = `${task.due_date}T${task.end_time}`

				return (
					<div
						key={task.id}
						className='absolute z-50 flex transform flex-col gap-6 rounded-2xl bg-blue-300 p-4.5 dark:bg-blue-400'
						style={{
							left: `${calculateTaskPosition(task).left}%`,
							top: `${getMinutes(startTime)}%`,
							width: `${calculateTaskPosition(task).width}dvh`
						}}
					>
						<div className='flex gap-2.5'>
							<div className='h-max rounded-full bg-violet-50 p-3 text-blue-500 dark:bg-neutral-600 dark:text-blue-300'>
								<DynamicIcon name={task.icon as IconName} />
							</div>
							<div className='flex flex-col gap-0.5'>
								<span className='truncate font-bold whitespace-break-spaces text-white'>
									{task.title}
								</span>
								<p className='text-sm text-white'>
									{formatTime(startTime)} - {formatTime(endTime)}
								</p>
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
											user.profile.avatar_path
												? user.profile.avatar_path
												: '/images/default-avatar.png'
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
			})}
		</div>
	)
}
