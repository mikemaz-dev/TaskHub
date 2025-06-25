'use client'

import dynamic from 'next/dynamic'

import { Heading } from '@/components/ui/Heading'
import { SearchField } from '@/components/ui/search-field/SearchField'

import { ProjectStats } from '@/app/dashboard/project-stats/ProjectStats'

const DynamicThemeToggle = dynamic(() =>
	import('@/components/ui/ThemeToggle').then(mod => mod.ThemeToggle)
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
				<div className='grid md:grid-cols-[32%_70%] grid-cols-[27%_72%] gap-6'>
					<ProjectStats />
					<div></div>
				</div>
			</div>
			<div className='p-5 flex items-center justify-center bg-violet-600 text-white text-2xl font-bold rounded-lg h-screen'>
				CHAT
			</div>
		</div>
	)
}
