import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

import { ProjectStatisticChartTooltip } from '@/components/sections/project-statistic/ProjectStatisticChartTooltip'

import { getProjectStatisticData } from '@/utils/getProjectStatisticData'

import type { ProjectStatisticPeriod } from '@/types/project/project-statistics/project-statistic-period.types'

interface IProjectStatisticChart {
	period: ProjectStatisticPeriod
}

export function ProjectStatisticChart({ period }: IProjectStatisticChart) {
	const statisticData = getProjectStatisticData(period)

	return (
		<ResponsiveContainer
			width='100%'
			height={366}
		>
			<AreaChart
				height={366}
				data={statisticData}
				className='select-none'
				margin={{ top: 0, left: -8, bottom: 4 }}
			>
				<defs>
					<linearGradient
						id='colorProjectCount'
						x1='0'
						y1='0'
						x2='0'
						y2='1'
					>
						<stop
							offset='5%'
							stopColor='#8884d8'
							stopOpacity={0.8}
						/>
						<stop
							offset='95%'
							stopColor='#8884d8'
							stopOpacity={0}
						/>
					</linearGradient>
				</defs>

				<CartesianGrid vertical={false} />
				<XAxis
					dataKey='name'
					className='border-neutral-200'
					axisLine={false}
					tickLine={false}
					dy={12}
				/>
				<YAxis
					className='text-gray-600 dark:text-gray-300'
					axisLine={false}
					tickLine={false}
					tickMargin={10}
					dx={-8}
				/>
				<Tooltip content={<ProjectStatisticChartTooltip />} />
				<Area
					type='natural'
					dataKey='projectCount'
					stroke='#8884d8'
					fillOpacity={1}
					fill='url(#colorProjectCount)'
					className='transition-all duration-300 hover:opacity-90'
				/>
			</AreaChart>
		</ResponsiveContainer>
	)
}
