import { getMinutes } from 'date-fns'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { memo } from 'react'

import { Users } from '@/components/ui/Users'

import { formatTime } from '@/utils/date/date.utl'
import { calculateTaskPosition } from '@/utils/timeline/timeline.util'

import type { TTask } from '@/types/tasks/task.types'

interface Props {
	task: TTask
}

function TimelineTask({ task }: Props) {
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

			<Users users={task.task_participants} />
		</div>
	)
}

export default memo(TimelineTask)
