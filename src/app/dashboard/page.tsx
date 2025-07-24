import type { Metadata } from 'next'

import { Dashboard } from '@/pages/Dashboard'
import { getServerProfile } from '@/services/profile/profile-server.service'
import { getServerTasks, getServerTodayTasks } from '@/services/tasks/task-server.service'

export const metadata: Metadata = {
	title: 'Dashboard'
}

export default async function Page() {
	const [tasks, todayTasks] = await Promise.all([getServerTasks(), getServerTodayTasks()])

	const userId = (await getServerProfile()).id

	return (
		<Dashboard
			tasks={tasks}
			todayTasks={todayTasks}
			userId={userId}
		/>
	)
}
