'use client'

import dynamic from 'next/dynamic'

import { LastTasks, ProjectStatistic, ProjectStats } from '@/components/sections'
import { Heading } from '@/components/ui/Heading'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { SearchField } from '@/components/ui/search-field/SearchField'

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
			<div className='flex  flex-col gap-6 overflow-y-scroll h-screen hide-scrollbar'>
				<div className='flex items-center justify-between mt-6'>
					<Heading>Dashboard</Heading>
					<div className='flex items-center justify-center gap-2'>
						<SearchField
							value=''
							onChange={() => {}}
						/>
						<DynamicThemeToggle />
					</div>
				</div>
				<section className='flex flex-col gap-8.5 mb-6'>
					<div className='grid grid-cols-[32.5%_65.5%] gap-6 max-sm:block'>
						<ProjectStats />
						<ProjectStatistic />
					</div>
					<LastTasks />
				</section>
			</div>
			<section className='flex items-center justify-center bg-blue-400/50 text-white text-2xl font-bold h-screen'>
				CHAT
			</section>
		</div>
	)
}
