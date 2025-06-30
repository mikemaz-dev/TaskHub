import { TodayTasksHeader } from '@/components/sections/today-tasks'
import { TodayTasksTimeline } from '@/components/sections/today-tasks/TodayTasksTimeline'

export function TodayTasks() {
	return (
		<div className='p-5 flex flex-col gap-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-sm'>
			<TodayTasksHeader />
			<TodayTasksTimeline />
		</div>
	)
}
