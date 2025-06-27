'use client'

import dynamic from 'next/dynamic'

import { Heading } from '@/components/ui/Heading'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { SearchField } from '@/components/ui/search-field/SearchField'

import { LastTasks } from '@/app/dashboard/last-tasks/LastTasks'
import { ProjectStatistic } from '@/app/dashboard/project-statistics/ProjectStatistic'
import { ProjectStats } from '@/app/dashboard/project-stats/ProjectStats'

const DynamicThemeToggle = dynamic(
	() => import('@/components/ui/ThemeToggle').then(mod => mod.ThemeToggle),
	{
		ssr: false,
		loading: () => <SkeletonLoader className='size-5' />
	}
)

export function Dashboard() {
	return (
		<div className='grid grid-cols-[3fr_1fr] gap-6'>
			<div className='flex flex-col gap-6'>
				<div className='flex items-center justify-between'>
					<Heading>Dashboard</Heading>
					<div className='flex items-center justify-center gap-2'>
						<SearchField
							value=''
							onChange={() => {}}
						/>
						<DynamicThemeToggle />
					</div>
				</div>
				<section className='flex flex-col gap-7'>
					<div className='grid grid-cols-[32%_66%] gap-6 max-sm:block'>
						<ProjectStats />
						<ProjectStatistic />
					</div>
					<LastTasks />
				</section>
			</div>
			<section className='flex items-center justify-center bg-neutral-800 text-white text-2xl font-bold rounded-lg h-screen'>
				CHAT
			</section>
		</div>
	)
}
