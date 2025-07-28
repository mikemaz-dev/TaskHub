import { getServerProjectChartData, getServerProjectStatsData } from '@/services'
import { getClientProjectChartData } from '@/services/statistics/chart/project-chart-client.service'

export type TGetProjectStatsResponse = NonNullable<
	Awaited<ReturnType<typeof getServerProjectStatsData>>['data']
>
export type TGetProjectChartResponse = NonNullable<
	Awaited<ReturnType<typeof getServerProjectChartData>>['data']
>

export type TGetClientProjectChartResponse = Awaited<ReturnType<typeof getClientProjectChartData>>
