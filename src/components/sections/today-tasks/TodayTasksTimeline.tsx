import { isSameDay } from 'date-fns'

import { TimeSlotItem } from '@/components/sections/today-tasks/TimeSlotItem'

import { TIMELINE_SLOTS } from '@/data/timeline/timeline-slots.data'
import type { TTask } from '@/types/tasks/task.types'

export function TodayTasksTimeline({ tasks }: { tasks: TTask[] }) {
	const today = new Date()

	const todayTasks = tasks.filter(task => isSameDay(task.due_date, today))

	return (
		<div className='flex h-full justify-between px-8 pb-5'>
			{TIMELINE_SLOTS.map(slot => (
				<TimeSlotItem
					key={slot.hour}
					tasks={todayTasks}
					time={slot.time}
				/>
			))}
		</div>
	)
}
