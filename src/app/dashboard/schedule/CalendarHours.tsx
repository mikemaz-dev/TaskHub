'use client'

import { format } from 'date-fns'
import { Plus } from 'lucide-react'
import { scheduleError } from '@/utils/task-schedule'
import type { TGetTasksResponse } from '@/types/tasks/task.types'

export function CalendarHours({ days, tasks, setSelected, setCreating }: {
	days: Date[]
	tasks: TGetTasksResponse
	setSelected: (id: string) => void
	setCreating: (value: {date: string; time?: string}) => void
}) {
	return <>
			{Array.from({ length: 24 }, (_, i) => i).map(hour => (
				<div className='th-grid-row' key={hour}>
					<span data-hour={hour} className='th-hour-anchor' />
					<span className='th-hour-label'>{String(hour).padStart(2, '0')}:00</span>
					{days.map(d => {
						const key = format(d, 'yyyy-MM-dd')
						const time = `${String(hour).padStart(2, '0')}:00`
						const past = !!scheduleError(key, time)
						const items = tasks.filter(
							t => t.due_date === key && t.start_time && Number(t.start_time.slice(0, 2)) === hour
						)
						return (
							<div className='th-slot' key={key} data-slot-date={key} data-slot-hour={hour}>
								{items.length ? (
									items.map(t => (
										<button
											key={t.id}
											className='th-calendar-event'
											style={{ borderLeftColor: t.project?.color || 'var(--primary)' }}
											onClick={() => setSelected(t.id)}
										>
											<strong>{t.title}</strong>
											<small>
												{t.start_time?.slice(0, 5)}
												{t.end_time ? ` – ${t.end_time.slice(0, 5)}` : ''}
											</small>
										</button>
									))
								) : past ? (
									<div className='th-past-slot' aria-label='Past time' />
								) : (
									<button
										className='th-empty-slot'
										title={`Available · ${format(d, 'EEE, MMM d')} · ${time}`}
										disabled={past}
										aria-label={`Plan task on ${format(d, 'MMMM d')} at ${hour}:00`}
										onClick={() =>
											!scheduleError(key, time) && setCreating({
												date: key,
												time: `${String(hour).padStart(2, '0')}:00`
											})
										}
									>
										<Plus size={14} />
									</button>
								)}
							</div>
						)
					})}
				</div>
			))}
	</>
}
