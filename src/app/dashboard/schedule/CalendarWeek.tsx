'use client'

import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { CalendarNow } from './CalendarNow'
import { CalendarPeriod } from './CalendarPeriod'
import { CalendarHours } from './CalendarHours'

import type { TGetTasksResponse } from '@/types/tasks/task.types'

export function CalendarWeek({
	days,
	date,
	period,
	tasks,
	choose,
	setSelected,
	setCreating
}: {
	days: Date[]
	date: string
	period: number
	tasks: TGetTasksResponse
	choose: (v: string) => void
	setSelected: (v: string) => void
	setCreating: (v: { date: string; time?: string }) => void
}) {
	const scroll = useRef<HTMLDivElement>(null)
	const [visiblePeriod, setVisiblePeriod] = useState(period)
	function jump(hour: number) {
		const root = scroll.current
		const anchor = root?.querySelector<HTMLElement>(`[data-hour="${hour}"]`)
		if (root && anchor) root.scrollTo({ top: anchor.offsetTop })
	}
	useEffect(() => { jump(period) }, [period])
	function onScroll() {
		const root = scroll.current
		if (!root) return
		let current = 0
		for (const hour of [8, 16]) {
			const anchor = root.querySelector<HTMLElement>(`[data-hour="${hour}"]`)
			if (anchor && root.scrollTop + 2 >= anchor.offsetTop) current = hour
		}
		if (root.scrollTop > 0 && root.scrollTop + root.clientHeight >= root.scrollHeight - 2) current = 16
		setVisiblePeriod(current)
	}
	return (
		<>
		<div className='th-planner-time-tools'>
			<CalendarNow scroll={scroll} date={date} columns={days.length} choose={choose} />
			<CalendarPeriod period={visiblePeriod} setPeriod={jump} />
		</div>
		<div
			className='th-week-grid th-week-heading'
			style={{ gridTemplateColumns: `48px repeat(${days.length},minmax(0,1fr))` }}
		>
			<span />
			{days.map(d => {
				const key = format(d, 'yyyy-MM-dd')
				return (
					<button
						className={`th-week-day ${key === date ? 'is-selected' : ''} ${key < format(new Date(), 'yyyy-MM-dd') ? 'is-past' : ''}`}
						key={key}
						onClick={() => choose(key)}
					>
						<span>{format(d, 'EEE')}</span>
						<strong>{format(d, 'd')}</strong>
					</button>
				)
			})}
			<span className='th-hour-label'>All day</span>
			{days.map(d => {
				const key = format(d, 'yyyy-MM-dd')
				return (
					<div key={key} className='th-slot th-all-day'>
						{tasks
							.filter(t => t.due_date === key && !t.start_time)
							.map(t => (
								<button className='th-calendar-event' key={t.id} onClick={() => setSelected(t.id)}>
									{t.title}
								</button>
							))}
					</div>
				)
			})}
		</div>
		<div className='th-hours-scroll' ref={scroll} onScroll={onScroll} tabIndex={0} aria-label='Schedule hours'>
			<div className='th-hours-grid' style={{ gridTemplateColumns: `48px repeat(${days.length},minmax(0,1fr))` }}>
				<CalendarHours days={days} tasks={tasks} setSelected={setSelected} setCreating={setCreating} />
			</div>
		</div>
		</>
	)
}
