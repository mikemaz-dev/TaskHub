'use client'

import dynamic from 'next/dynamic'

import { Heading } from '@/components/ui/Heading'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { SearchField } from '@/components/ui/search-field/SearchField'

import { ProjectStatistic } from '@/app/dashboard/project-statistics/ProjectStatistic'
import { ProjectStats } from '@/app/dashboard/project-stats/ProjectStats'

const DynamicThemeToggle = dynamic(
	() => import('@/components/ui/ThemeToggle').then(mod => mod.ThemeToggle),
	{
		ssr: false,
		loading: () => <SkeletonLoader className='size-9.5' />
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
				<div className='flex items-center justify-between max-sm:block gap-2'>
					<ProjectStats />
					<ProjectStatistic />
				</div>
			</div>
			<div className='flex items-center justify-center bg-neutral-800 text-white text-2xl font-bold rounded-lg h-screen'>
				CHAT
			</div>
		</div>
	)
}
