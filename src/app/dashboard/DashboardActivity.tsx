'use client'

import { format } from 'date-fns'
import { Folder } from 'lucide-react'
import Link from 'next/link'

import { isTaskDone } from '@/lib/analytics/metrics'
import type { TGetProjectsResponse } from '@/types/project/project.types'
import type { TGetTasksResponse } from '@/types/tasks/task.types'

export function DashboardActivity({
	projects,
	tasks,
	today,
	setSelected
}: {
	projects: TGetProjectsResponse
	tasks: TGetTasksResponse
	today: string
	setSelected: (id: string) => void
}) {
	return (
		<aside className='th-panel th-activity'>
			<h2>Activity feed</h2>
			<div className='th-workspace-summary'>
				<span className='th-icon-tile'>
					<Folder size={24} />
				</span>
				<h3>Your workspace</h3>
				<p>{projects.length} projects. One place to move forward.</p>
			</div>
			<h3 className='th-small th-muted'>Upcoming deadlines</h3>
			{tasks
				.filter(t => !isTaskDone(t) && t.due_date >= today)
				.sort((a, b) => a.due_date.localeCompare(b.due_date))
				.slice(0, 5)
				.map(t => (
					<button className='th-feed-item' key={t.id} onClick={() => setSelected(t.id)}>
						<strong>{t.title}</strong>
						<small>{format(new Date(`${t.due_date}T12:00:00`), 'EEE, MMM d')}</small>
					</button>
				))}
			{!tasks.length && (
				<p className='th-small th-muted'>Your project activity will grow as you start working.</p>
			)}
			<Link href='/dashboard/team' className='th-button th-button-subtle'>
				Meet your team
			</Link>
		</aside>
	)
}
