import Image from 'next/image'

import { FormatMinutes } from '@/utils/date/date.utl'

import type { TGetProjectStatsResponse } from '@/types/statistic/statistic.types'

interface IProjectStatCard {
	projectStat: TGetProjectStatsResponse[0]
	isLast: boolean
}

export function ProjectStatCard({ projectStat, isLast }: IProjectStatCard) {
	return (
		<div
			className='flex items-center justify-between gap-4 overflow-hidden base-round p-7 dark:text-neutral-800'
			style={{
				backgroundColor: `${projectStat.bg_color}`
			}}
		>
			<div className='flex flex-col gap-1'>
				<span className='text-5xl font-semibold'>
					{isLast ? FormatMinutes(projectStat.number) : projectStat.number}
				</span>
				<span className='font-semibold'>{projectStat.label}</span>
			</div>
			<Image
				src={projectStat.icon || ''}
				alt={projectStat.label}
				title={projectStat.label}
				width={80}
				height={80}
			/>
		</div>
	)
}
