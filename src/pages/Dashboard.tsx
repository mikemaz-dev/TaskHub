'use client'

import { Header } from '@/components/layout/header/Header'
import {
	LastTasks,
	ProjectStatistic,
	ProjectStats,
	TodayTasks,
	TodayTasksTimeline
} from '@/components/sections'

export function Dashboard() {
	return (
		<div className='grid grid-cols-[3fr_1fr] gap-6 md:p-6 md:pt-0 lg:p-6 lg:pt-0 xl:w-screen xl:grid-cols-none xl:p-6 xl:pt-0'>
			<div className='hide-scrollbar flex h-screen flex-col gap-6 overflow-y-scroll'>
				<Header />
				<section className='mb-6 flex flex-col gap-8.5'>
					<div className='grid grid-cols-[1fr_2fr] gap-6 md:flex md:flex-col'>
						<ProjectStats />
						<ProjectStatistic />
					</div>
					<div className='flex flex-col gap-8'>
						<LastTasks />
						<TodayTasks />
					</div>
				</section>
			</div>
			<section className='flex h-screen items-center justify-center bg-blue-400/50 text-2xl font-bold text-white xl:hidden'>
				CHAT
			</section>
		</div>
	)
}
