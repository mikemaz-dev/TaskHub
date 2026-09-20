'use client'

import { CalendarDays } from 'lucide-react'
import Link from 'next/link'

import { isTaskDone } from '@/lib/analytics/metrics'
import type { TGetTasksResponse } from '@/types/tasks/task.types'

export function DashboardToday({
	todayTasks,
	setSelected
}: {
	todayTasks: TGetTasksResponse
	setSelected: (id: string) => void
}) {
	return (
		<section className='th-panel th-card th-today-section'>
			<div className='th-section-title'>
				<h2>Today&apos;s tasks</h2>
				<Link href='/dashboard/schedule' className='th-small th-muted'>
					View schedule
				</Link>
			</div>
			{todayTasks.length ? (
				todayTasks.map(t => (
					<button key={t.id} className='th-today-task' onClick={() => setSelected(t.id)}>
						<span>{t.start_time?.slice(0, 5) || 'All day'}</span>
						<strong>{t.title}</strong>
						<i className='th-today-connector' aria-hidden='true' />
						<span>
							{isTaskDone(t) ? 'Completed' : t.end_time?.slice(0, 5) || 'Unscheduled end'}
						</span>
					</button>
				))
			) : (
				<div className='th-empty'>
					<CalendarDays size={24} style={{ margin: '0 auto 12px' }} />
					<p>Your day is clear. Plan a task when you&apos;re ready.</p>
				</div>
			)}
		</section>
	)
}
