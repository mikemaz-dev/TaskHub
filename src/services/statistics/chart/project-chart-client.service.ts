'use client'

import { createClient } from '@/utils/supabase/client'

import type { ProjectStatisticPeriod } from '@/types/project/project-statistics/project-statistic-period.types'

export async function getClientProjectChartData(rangeType: ProjectStatisticPeriod) {
	const client = createClient()

	const { data, error } = await client
		.from('project_chart_point')
		.select('*')
		.eq('range_type', rangeType)
		.order('period', {
			ascending: true
		})

	if (error || !data) throw new Error(error?.message || 'Project chart data not found')
	return data
}
