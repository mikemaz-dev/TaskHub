'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { ProjectStatisticChart } from '@/components/sections/project-statistic/ProjectStatisticChart'
import DropdownButton from '@/components/ui/DropdownButton'
import SectionHeading from '@/components/ui/SectionHeading'

import { getClientProjectChartData } from '@/services/statistics/chart/project-chart-client.service'
import type { IDropdownItem } from '@/types/dropdown/dropdown-item.types'
import type { ProjectStatisticPeriod } from '@/types/project/project-statistics/project-statistic-period.types'
import type { TGetClientProjectChartResponse } from '@/types/statistic/statistic.types'

interface Props {
	chartData: TGetClientProjectChartResponse
}

export function ProjectStatistic({ chartData }: Props) {
	const [selectedPeriod, setSelectedPeriod] = useState<ProjectStatisticPeriod>('yearly')

	const dropdownItems: IDropdownItem[] = [
		{ label: 'Yearly', value: 'yearly' },
		{ label: 'Monthly', value: 'monthly' }
	]

	const handlePeriodChange = (item: IDropdownItem) => {
		setSelectedPeriod(item.value as ProjectStatisticPeriod)
	}

	const { data } = useQuery({
		queryKey: ['project-chart-data', selectedPeriod],
		queryFn: () => getClientProjectChartData(selectedPeriod),
		placeholderData: chartData
	})

	return (
		<div className='flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm dark:bg-neutral-800'>
			<div className='flex items-center justify-between'>
				<SectionHeading title='Project Statistic' />
				<DropdownButton
					items={dropdownItems}
					placeholder={selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
					onSelect={handlePeriodChange}
				/>
			</div>
			<ProjectStatisticChart
				period={selectedPeriod}
				data={data || []}
			/>
		</div>
	)
}
