import Image from 'next/image'

import { cn } from '@/utils/cn.util'
import { FormatMinutes } from '@/utils/format-minutes.util'

import type { TGetProjectStatsResponse } from '@/types/statistic/statistic.types'

interface IProjectStatCard {
	projectStat: TGetProjectStatsResponse[0]
	isLast: boolean
}

export function ProjectStatCard({ projectStat, isLast }: IProjectStatCard) {
	return (
		<div
			className={cn(
				projectStat.bg_color,
				'flex items-center justify-between overflow-hidden rounded-3xl p-6'
			)}
		>
			<div className='flex flex-col'>
				<span className='mb-1 text-5xl font-semibold'>
					{isLast ? FormatMinutes(projectStat.number) : projectStat.number}
				</span>
				<span className='font-medium'>{projectStat.label}</span>
			</div>
			<div className='flex-shrink-0'>
				<Image
					src={projectStat.icon || ''}
					alt={projectStat.label}
					width={80}
					height={80}
				/>
			</div>
		</div>
	)
}
