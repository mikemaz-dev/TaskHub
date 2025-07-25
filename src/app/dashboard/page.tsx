import type { Metadata } from 'next'

import { Dashboard } from '@/pages/Dashboard'
import {
	getServerProfile,
	getServerProjectChartData,
	getServerProjectStatsData,
	getServerTasks,
	getServerTodayTasks
} from '@/services'

export const metadata: Metadata = {
	title: 'Dashboard'
}

export default async function Page() {
	const [tasks, todayTasks, projectStats, projectChart] = await Promise.all([
		getServerTasks(),
		getServerTodayTasks(),
		getServerProjectStatsData(),
		getServerProjectChartData('yearly')
	])

	const userId = (await getServerProfile()).id

	return (
		<Dashboard
			tasks={tasks.data || []}
			todayTasks={todayTasks.data || []}
			userId={userId}
			projectStats={projectStats.data || []}
			projectChartData={projectChart.data || []}
		/>
	)
}
