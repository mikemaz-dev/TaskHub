import { format } from 'date-fns'

import { TimeSlotItem } from '@/components/sections/today-tasks/TimeSlotItem'

import { TIMELINE_SLOTS } from '@/data/timeline/timeline-slots.data'
import type { TGetTasksResponse, TTask } from '@/types/tasks/task.types'

export function TodayTasksTimeline({ tasks }: { tasks: TTask[] }) {
	if (!tasks?.length)
		return (
			<div className='flex h-full w-full items-center justify-center'>
				<span className='text-xl font-medium'>No tasks for today</span>
			</div>
		)

	const tasksByTimeSlot =
		tasks.reduce<Record<string, TGetTasksResponse>>((acc, task) => {
			const startTime = `${task.due_date}T${task.start_time}`
			const slotTime = format(new Date(startTime), 'h aaa')

			if (!acc[slotTime]) {
				acc[slotTime] = []
			}
			acc[slotTime].push(task)

			return acc
		}, {}) ?? {}

	return (
		<div className='flex h-full justify-between px-8 pb-5'>
			{TIMELINE_SLOTS.map(slot => (
				<TimeSlotItem
					key={slot.hour}
					tasks={tasksByTimeSlot[slot.time] || []}
					time={slot.time}
				/>
			))}
		</div>
	)
}
