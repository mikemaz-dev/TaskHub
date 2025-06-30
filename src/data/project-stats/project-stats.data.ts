import type { IProjectStats } from '@/types/project/project-stats.types'

export const PROJECT_STATS_DATA: IProjectStats[] = [
	{
		id: 1,
		number: 92,
		label: 'Active Projects',
		bgColor: 'bg-sky-200 dark:bg-cyan-400',
		icon: '/images/icon/project-stats/active-projects.svg'
	},
	{
		id: 2,
		number: 35,
		label: 'On Going Projects',
		bgColor: 'bg-lime-300 dark:bg-amber-400',
		icon: '/images/icon/project-stats/ongoing-projects.svg'
	},
	{
		id: 3,
		number: 1149,
		label: 'Working Hours',
		bgColor: 'bg-slate-300 dark:bg-indigo-300',
		icon: '/images/icon/project-stats/working-hours.svg'
	}
]
