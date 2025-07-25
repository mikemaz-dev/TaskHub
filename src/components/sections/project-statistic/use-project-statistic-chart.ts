import { useQuery } from '@tanstack/react-query'

import { getClientProjectChartData } from '@/services/statistics/chart/project-chart-client.service'
import type { ProjectStatisticPeriod } from '@/types/project/project-statistics/project-statistic-period.types'

export const useProjectStatisticChart = (period: ProjectStatisticPeriod) => {
	return useQuery({
		queryKey: ['project-statistic-chart'],
		queryFn: () => getClientProjectChartData(period)
	})
}
