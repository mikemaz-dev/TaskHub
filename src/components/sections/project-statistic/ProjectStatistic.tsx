'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

import { DropdownButton, SectionHeading, SkeletonLoader } from '@/components/ui/'

import type { IDropdownItem } from '@/types/dropdown/dropdown-item.types'
import type { ProjectStatisticPeriod } from '@/types/project/project-statistics/project-statistic-period.types'
import type { TGetProjectChartResponse } from '@/types/statistic/statistic.types'

const DynamicProjectStatisticChart = dynamic(
	() => import('./ProjectStatisticChart').then(mod => mod.ProjectStatisticChart),
	{
		ssr: false,
		loading: () => <SkeletonLoader className='h-88 w-185' />
	}
)

export function ProjectStatistic({ chartData }: { chartData: TGetProjectChartResponse }) {
	const [selectedPeriod, setSelectedPeriod] = useState<ProjectStatisticPeriod>('yearly')

	const dropdownItems: IDropdownItem[] = [
		{ label: 'Yearly', value: 'yearly' },
		{ label: 'Monthly', value: 'monthly' }
	]

	const handlePeriodChange = (item: IDropdownItem) => {
		setSelectedPeriod(item.value as ProjectStatisticPeriod)
	}

	return (
		<div className='flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm dark:bg-neutral-800'>
			<div className='flex items-center justify-between'>
				<SectionHeading title='Project Statistic' />
				<DropdownButton
					items={dropdownItems}
					placeholder='Select mode'
					onSelect={handlePeriodChange}
				/>
			</div>
			<DynamicProjectStatisticChart
				period={selectedPeriod}
				data={chartData}
			/>
		</div>
	)
}
