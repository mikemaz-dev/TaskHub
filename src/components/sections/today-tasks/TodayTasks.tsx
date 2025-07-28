import { TodayTasksHeader } from '@/components/sections/today-tasks'
import { TodayTasksTimeline } from '@/components/sections/today-tasks/TodayTasksTimeline'

import type { TTask } from '@/types/tasks/task.types'
import type { TGetUsersResponse } from '@/types/user/user.types'

interface Props {
	tasks: TTask[]
	usersData: TGetUsersResponse
}

export function TodayTasks({ tasks, usersData }: Props) {
	return (
		<div className='flex h-full flex-col gap-6 rounded-3xl bg-white p-5 shadow-sm dark:bg-neutral-800'>
			<TodayTasksHeader usersData={usersData} />
			<TodayTasksTimeline tasks={tasks} />
		</div>
	)
}
