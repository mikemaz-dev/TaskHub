import { TodayTasksHeader } from '@/components/sections/today-tasks'
import { TodayTasksTimeline } from '@/components/sections/today-tasks/TodayTasksTimeline'

import type { TTask } from '@/types/tasks/task.types'

export function TodayTasks({ tasks }: { tasks: TTask[] }) {
	return (
		<div className='зи-10 flex h-full flex-col gap-6 rounded-3xl bg-white p-5 shadow-sm dark:bg-neutral-800'>
			<TodayTasksHeader />
			<TodayTasksTimeline tasks={tasks} />
		</div>
	)
}
