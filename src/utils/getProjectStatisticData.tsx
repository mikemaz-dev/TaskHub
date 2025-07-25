import {
	PROJECT_STATISTIC_MONTHLY_DATA,
	PROJECT_STATISTIC_YEARLY_DATA
} from '@/data/project-statistc'
import type { ProjectStatisticPeriod } from '@/types/project/project-statistics/project-statistic-period.types'
import type { TGetProjectChartResponse } from '@/types/statistic/statistic.types'

export const getProjectStatisticData = (
	period: ProjectStatisticPeriod,
	data: TGetProjectChartResponse
) => {
	return period === 'monthly' ? PROJECT_STATISTIC_MONTHLY_DATA : PROJECT_STATISTIC_YEARLY_DATA
}
