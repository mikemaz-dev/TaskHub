'use client'
import { addDays, addMonths, format, startOfWeek } from 'date-fns'
import { useState } from 'react'
import { scheduleError } from '@/utils/task-schedule'
import { useCalendarClock } from './useCalendarClock'

import { Header } from '@/components/layout/header/Header'
import { TaskModal } from '@/components/modals/task/TaskModal'
import { CalendarFocus } from './CalendarFocus'
import { CalendarMonth } from './CalendarMonth'
import { CalendarNavigation } from './CalendarNavigation'
import { CalendarUpcoming } from './CalendarUpcoming'
import { CalendarViewSwitch } from './CalendarViewSwitch'
import { CalendarWeek } from './CalendarWeek'
import { isTaskDone } from '@/lib/analytics/metrics'
import type { TGetTasksResponse } from '@/types/tasks/task.types'

export function CalendarView({ tasks }: { tasks: TGetTasksResponse }) {
	const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
	const [view, setView] = useState<'day' | 'week' | 'month'>('week')
	const [period, setPeriod] = useState(8)
	const [creating, setCreating] = useState<{ date: string; time?: string } | null>(null)
	const [selected, setSelected] = useState<string | null>(null)
	const current = new Date(date + 'T12:00:00')
	const first = startOfWeek(current, { weekStartsOn: 1 })
	const days = view === 'day' ? [current] : Array.from({ length: 7 }, (_, i) => addDays(first, i))
	const task = tasks.find(t => t.id === selected)
	const today = useCalendarClock().date
	const dayTasks = tasks.filter(t => t.due_date === date)
	const upcoming = tasks
		.filter(t => t.due_date >= today && !isTaskDone(t))
		.sort((a, b) =>
			(a.due_date + (a.start_time || '')).localeCompare(b.due_date + (b.start_time || ''))
		)
	function plan(value: { date: string; time?: string }) {
		if (scheduleError(value.date, value.time)) return
		setDate(value.date)
		setCreating(value)
	}
	function navigate(n: number) {
		setDate(
			format(
				view === 'month' ? addMonths(current, n) : addDays(current, n * (view === 'week' ? 7 : 1)),
				'yyyy-MM-dd'
			)
		)
	}
	function choose(d: string) {
		setDate(d)
		const timed = tasks.find(t => t.due_date === d && t.start_time)
		if (timed) setPeriod(Math.floor(Number(timed.start_time!.slice(0, 2)) / 8) * 8)
	}
	return (
		<div className='th-page th-schedule'>
			<Header title='Schedule & timeline' />
			<div className='th-planner-layout'>
				<CalendarFocus
					date={date}
					current={current}
					dayTasks={dayTasks}
					choose={choose}
					setCreating={plan}
				/>
				<section className='th-panel th-planner'>
					<CalendarViewSwitch view={view} setView={setView} />
					<CalendarNavigation
						view={view}
						first={first}
						current={current}
						today={today}
						navigate={navigate}
						choose={choose}
					/>
					{view === 'month' ? (
						<CalendarMonth
							current={current}
							today={today}
							tasks={tasks}
							choose={choose}
							setView={setView}
						/>
					) : (
							<CalendarWeek
								days={days}
								date={date}
								period={period}
								tasks={tasks}
								choose={choose}
								setSelected={setSelected}
								setCreating={plan}
							/>
					)}
				</section>
				<CalendarUpcoming upcoming={upcoming} setSelected={setSelected} />
			</div>
			{creating && (
				<TaskModal
					mode='create'
					isOpen
					initialDate={creating.date}
					initialTime={creating.time}
					setIsOpen={open => {
						if (!open) setCreating(null)
					}}
				/>
			)}
			{task && (
				<TaskModal
					key={task.id}
					mode='edit'
					task={task}
					isOpen
					setIsOpen={open => {
						if (!open) setSelected(null)
					}}
				/>
			)}
		</div>
	)
}
