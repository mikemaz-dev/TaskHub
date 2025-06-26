'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

import { DropdownButton } from '@/components/ui/DropdownButton'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

import type { IDropdownItem } from '@/types/dropdown/dropdown-item.types'
import type { ProjectStatisticPeriod } from '@/types/project/project-statistics/project-statistic-period.types'

const DynamicProjectStatisticChart = dynamic(
	() => import('./ProjectStatisticChart').then(mod => mod.ProjectStatisticChart),
	{
		ssr: false,
		loading: () => <SkeletonLoader className='h-88 w-199' />
	}
)

export function ProjectStatistic() {
	const [selectedPeriod, setSelectedPeriod] = useState<ProjectStatisticPeriod>('monthly')

	const dropdownItems: IDropdownItem[] = [
		{ label: 'Yearly', value: 'yearly' },
		{ label: 'Monthly', value: 'monthly' }
	]

	const handlePeriodChange = (item: IDropdownItem) => {
		setSelectedPeriod(item.value as ProjectStatisticPeriod)
	}

	return (
		<div className='p-5 flex flex-col gap-4 rounded-3xl bg-white dark:bg-neutral-800 shadow-sm'>
			<div className='flex items-center justify-between'>
				<span className='text-2xl font-bold transition-colors duration-300'>Project Statistic</span>
				<DropdownButton
					items={dropdownItems}
					placeholder='Select mode'
					onSelect={handlePeriodChange}
				/>
			</div>
			<div>
				<DynamicProjectStatisticChart period={selectedPeriod} />
			</div>
		</div>
	)
}
