import { ProjectStatCard } from '@/components/sections/project-stats/ProjectStatCard'

import type { TGetProjectStatsResponse } from '@/types/statistic/statistic.types'

export function ProjectStats({ projectStats }: { projectStats: TGetProjectStatsResponse }) {
	return (
		<div className='flex flex-col gap-5'>
			{projectStats?.map((projectStat, index) => (
				<ProjectStatCard
					key={projectStat.id}
					projectStat={projectStat}
					isLast={index === projectStats.length - 1}
				/>
			))}
		</div>
	)
}
