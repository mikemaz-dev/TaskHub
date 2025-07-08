import { TimeSlotItem } from '@/components/sections/today-tasks/TimeSlotItem'

import { useTaskStore } from '@/store/task.store'

import { TIMELINE_SLOTS } from '@/data/timeline/timeline-slots.data'

export function TodayTasksTimeline() {
	const tasks = useTaskStore(state => state.tasks)

	return (
		<div className='flex h-full justify-between px-8 pb-5'>
			{TIMELINE_SLOTS.map(slot => (
				<TimeSlotItem
					key={slot.hour}
					tasks={tasks}
					time={slot.time}
				/>
			))}
		</div>
	)
}
