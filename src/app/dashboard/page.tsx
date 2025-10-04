import type { Metadata } from 'next'

import { Dashboard } from './Dashboard'
import {
	getServerProfile,
	getServerProjectChartData,
	getServerProjectStatsData,
	getServerTasks,
	getServerTodayTasks
} from '@/services'
import { getServerProjects } from '@/services/projects/project-server.service'
import { getServerUsers } from '@/services/users/get-users-server'

export const metadata: Metadata = {
	title: 'Dashboard'
}

export default async function Page() {
	const [tasks, todayTasks, projects, projectStats, projectChartData, usersData] =
		await Promise.all([
			getServerTasks(),
			getServerTodayTasks(),
			getServerProjects(),
			getServerProjectStatsData(),
			getServerProjectChartData('yearly'),
			getServerUsers()
		])

	const userId = (await getServerProfile()).id

	return (
		<Dashboard
			tasks={tasks.data || []}
			todayTasks={todayTasks.data || []}
			userId={userId}
			projects={projects.data || []}
			projectStats={projectStats.data || []}
			projectChartData={projectChartData.data || []}
			usersData={usersData.data || []}
		/>
	)
}
