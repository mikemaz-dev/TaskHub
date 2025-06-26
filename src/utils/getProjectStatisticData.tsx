import { PROJECT_STATISTIC_MONTHLY_DATA } from '@/data/project-statistc/project-statistic_monthly.data'
import { PROJECT_STATISTIC_YEARLY_DATA } from '@/data/project-statistc/project-statistic_yearly.data'
import type { ProjectStatisticPeriod } from '@/types/project/project-statistics/project-statistic-period.types'

export const getProjectStatisticData = (period: ProjectStatisticPeriod) => {
	return period === 'monthly' ? PROJECT_STATISTIC_MONTHLY_DATA : PROJECT_STATISTIC_YEARLY_DATA
}
