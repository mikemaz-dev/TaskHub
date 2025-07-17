import { TimeSlotItem } from '@/components/sections/today-tasks/TimeSlotItem'

import { useGetTasks } from '@/hooks/useGetTasks'

import { TIMELINE_SLOTS } from '@/data/timeline/timeline-slots.data'
import type { ITask } from '@/types/tasks/task.types'

export function TodayTasksTimeline() {
	const tasks = useGetTasks()

	const todayTasks = (tasks.data as ITask[]) || []

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
