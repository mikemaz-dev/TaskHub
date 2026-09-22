'use client'

import { format } from 'date-fns'
import { Plus } from 'lucide-react'

import { MiniCalendar } from '@/components/workspace/controls/DatePicker'

import { isTaskDone } from '@/lib/analytics/metrics'
import type { TGetTasksResponse } from '@/types/tasks/task.types'

export function CalendarFocus({
	date,
	current,
	dayTasks,
	choose,
	setCreating
}: {
	date: string
	current: Date
	dayTasks: TGetTasksResponse
	choose: (v: string) => void
	setCreating: (v: { date: string; time?: string }) => void
}) {
	return (
		<aside className='th-panel th-planner-aside'>
			<MiniCalendar value={date} onChange={choose} />
			<div className='th-daily-focus'>
				<h2>Daily focus</h2>
				<p>{format(current, 'EEEE, MMM d')}</p>
				<span>
					<i />
					{dayTasks.length} tasks scheduled
				</span>
				<span>
					<i />
					{dayTasks.filter(isTaskDone).length} completed
				</span>
				<button className='th-button' disabled={date < format(new Date(), 'yyyy-MM-dd')} onClick={() => setCreating({ date })}>
					<Plus size={15} />
					Plan a task
				</button>
			</div>
		</aside>
	)
}
