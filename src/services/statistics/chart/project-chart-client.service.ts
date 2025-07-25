'use client'

import { createClient } from '@/utils/supabase/client'

import type { ProjectStatisticPeriod } from '@/types/project/project-statistics/project-statistic-period.types'

export function getClientProjectChartData(rangeType: ProjectStatisticPeriod) {
	const client = createClient()

	return client
		.from('project_chart_point')
		.select('*')
		.eq('range_type', rangeType)
		.order('period', {
			ascending: true
		})
}
