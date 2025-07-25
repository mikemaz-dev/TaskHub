import { getServerProjectChartData, getServerProjectStatsData } from '@/services'

export type TGetProjectStatsResponse = NonNullable<
	Awaited<ReturnType<typeof getServerProjectStatsData>>['data']
>
export type TGetProjectChartResponse = NonNullable<
	Awaited<ReturnType<typeof getServerProjectChartData>>['data']
>
