'use client'

import { format } from 'date-fns'
import { CalendarDays } from 'lucide-react'

import type { TGetTasksResponse } from '@/types/tasks/task.types'

export function CalendarUpcoming({
	upcoming,
	setSelected
}: {
	upcoming: TGetTasksResponse
	setSelected: (v: string) => void
}) {
	return (
		<aside className='th-panel th-upcoming'>
			<h2>Upcoming tasks</h2>
			<div>
				{upcoming.map(t => (
					<button className='th-feed-item' key={t.id} onClick={() => setSelected(t.id)}>
						<span className='th-small th-muted'>{t.project?.name || 'Task'}</span>
						<strong>{t.title}</strong>
						<small>
							{format(new Date(t.due_date + 'T12:00:00'), 'MMM d')} ·{' '}
							{t.start_time?.slice(0, 5) || 'All day'}
						</small>
					</button>
				))}
				{!upcoming.length && (
					<div className='th-empty'>
						<CalendarDays size={24} />
						<p>No upcoming tasks. Pick a day to plan your next step.</p>
					</div>
				)}
			</div>
		</aside>
	)
}
