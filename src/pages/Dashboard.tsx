'use client'

import { Header } from '@/components/layout/header/Header'
import { LastTasks, ProjectStatistic, ProjectStats } from '@/components/sections'

export function Dashboard() {
	return (
		<div className='grid grid-cols-[3fr_1fr] gap-6 xl:grid-cols-none xl:w-screen md:p-6 lg:p-6 md:pt-0 lg:pt-0 xl:p-6 xl:pt-0'>
			<div className='flex flex-col gap-6 overflow-y-scroll h-screen hide-scrollbar'>
				<Header />
				<section className='flex flex-col gap-8.5 mb-6'>
					<div className='grid grid-cols-[1fr_2fr] gap-6 md:flex md:flex-col'>
						<ProjectStats />
						<ProjectStatistic />
					</div>
					<LastTasks />
				</section>
			</div>
			<section className='flex items-center justify-center xl:hidden bg-blue-400/50 text-white text-2xl font-bold h-screen'>
				CHAT
			</section>
		</div>
	)
}
