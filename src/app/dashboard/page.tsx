import type { Metadata } from 'next'

import { Dashboard } from '@/components/pages/Dashboard'

import {
	getServerProfile,
	getServerProjectChartData,
	getServerProjectStatsData,
	getServerTasks,
	getServerTodayTasks
} from '@/services'
import { getServerUsers } from '@/services/users/get-users-server'

export const metadata: Metadata = {
	title: 'Dashboard'
}

export default async function Page() {
	const [tasks, todayTasks, projectStats, projectChartData, usersData] = await Promise.all([
		getServerTasks(),
		getServerTodayTasks(),
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
			projectStats={projectStats.data || []}
			projectChartData={projectChartData.data || []}
			usersData={usersData.data || []}
		/>
	)
}
