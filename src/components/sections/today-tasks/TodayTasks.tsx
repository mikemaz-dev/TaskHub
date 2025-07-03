import { TodayTasksHeader } from '@/components/sections/today-tasks'
import { TodayTasksTimeline } from '@/components/sections/today-tasks/TodayTasksTimeline'

export function TodayTasks() {
	return (
		<div className='flex flex-col gap-6 rounded-3xl bg-white p-5 shadow-sm dark:bg-neutral-800'>
			<TodayTasksHeader />
			<TodayTasksTimeline />
		</div>
	)
}
