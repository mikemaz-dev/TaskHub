import Image from 'next/image'

import { cn } from '@/utils/cn.util'
import { FormatMinutes } from '@/utils/format-minutes.util'

import type { IProjectStats } from '@/types/project-stats.types'

interface IProjectStatCard {
	projectStat: IProjectStats
}

export function ProjectStatCard({ projectStat }: IProjectStatCard) {
	return (
		<div className={cn(projectStat.bgColor, 'rounded-2xl p-6 overflow-hidden relative')}>
			<div className='flex items-center justify-between relative z-10'>
				<div className='flex flex-col'>
					<span className='text-5xl font-semibold mb-1'>
						{projectStat.id === 3 ? FormatMinutes(projectStat.number) : projectStat.number}
					</span>
					<span className='font-medium'>{projectStat.label}</span>
				</div>
				<Image
					src={projectStat.icon}
					alt={projectStat.label}
					width={95}
					height={95}
				/>
			</div>
		</div>
	)
}
