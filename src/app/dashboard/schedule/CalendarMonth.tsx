'use client'

import { addDays, format, isSameMonth, startOfMonth, startOfWeek } from 'date-fns'

import type { TGetTasksResponse } from '@/types/tasks/task.types'

export function CalendarMonth({
	current,
	today,
	tasks,
	choose,
	setView
}: {
	current: Date
	today: string
	tasks: TGetTasksResponse
	choose: (v: string) => void
	setView: (v: 'day' | 'week' | 'month') => void
}) {
	return (
		<div className='th-month-view'>
			{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
				<span key={d}>{d}</span>
			))}
			{Array.from({ length: 42 }, (_, i) => {
				const d = addDays(startOfWeek(startOfMonth(current), { weekStartsOn: 1 }), i)
				const key = format(d, 'yyyy-MM-dd')
				const items = tasks.filter(t => t.due_date === key)
				return (
					<button
						key={key}
						className={`${isSameMonth(d, current) ? '' : 'is-outside'} ${key === today ? 'is-today' : ''} ${key < today ? 'is-past' : ''}`}
						onClick={() => {
							choose(key)
							setView('day')
						}}
						aria-label={`${format(d, 'MMMM d')}, ${items.length} tasks`}
					>
						<strong>{format(d, 'd')}</strong>
						{items.slice(0, 2).map(t => (
							<small key={t.id}>{t.title}</small>
						))}
						{items.length > 2 && <small>+{items.length - 2} more</small>}
					</button>
				)
			})}
		</div>
	)
}
