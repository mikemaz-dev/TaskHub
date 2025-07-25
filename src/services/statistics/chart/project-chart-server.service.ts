'use server'

import { createClientFromServer } from '@/utils/supabase/server'

import type { ProjectStatisticPeriod } from '@/types/project/project-statistics/project-statistic-period.types'

export async function getServerProjectChartData(rangeType: ProjectStatisticPeriod) {
	const client = await createClientFromServer()

	return client
		.from('project_chart_point')
		.select('*')
		.eq('range_type', rangeType)
		.order('period', {
			ascending: true
		})
}
