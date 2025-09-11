'use client'

import { useEffect } from 'react'

import { Header } from '@/components/layout/header/Header'
import { Chat, LastTasks, ProjectStatistic, ProjectStats, TodayTasks } from '@/components/sections'

import { useTaskStore } from '@/store/task.store'

import type {
	TGetProjectChartResponse,
	TGetProjectStatsResponse
} from '@/types/statistic/statistic.types'
import type { TGetTasksResponse } from '@/types/tasks/task.types'
import type { TGetUsersResponse } from '@/types/user/user.types'

interface Props {
	tasks: TGetTasksResponse
	todayTasks: TGetTasksResponse
	projectStats: TGetProjectStatsResponse
	projectChartData: TGetProjectChartResponse
	usersData: TGetUsersResponse
	userId: string
}

export function Dashboard({
	tasks,
	todayTasks,
	projectStats,
	projectChartData,
	usersData,
	userId
}: Props) {
	const loadTasksFromServer = useTaskStore(state => state.loadFromServer)

	useEffect(() => {
		loadTasksFromServer(tasks)
	})

	return (
		<div className='bg-background grid grid-cols-[3fr_1fr] gap-6 pl-6 md:p-6 md:pt-0 lg:p-6 lg:pt-0 xl:w-screen xl:grid-cols-none xl:p-6 xl:pt-0'>
			<div className='hide-scrollbar flex h-screen flex-col gap-6 overflow-y-scroll'>
				<Header title='Dashboard' />
				<section className='mb-6 flex flex-col gap-8.5'>
					<div className='grid grid-cols-[0.5fr_1.2fr] gap-6 md:flex md:flex-col'>
						<ProjectStats projectStats={projectStats} />
						<ProjectStatistic chartData={projectChartData} />
					</div>
					<div className='flex flex-col gap-8.5'>
						<LastTasks tasks={tasks} />
						<TodayTasks
							tasks={todayTasks}
							usersData={usersData}
						/>
					</div>
				</section>
			</div>
			<Chat userId={userId} />
		</div>
	)
}
