'use client'

import { addDays, format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function CalendarNavigation({
	view,
	first,
	current,
	today,
	navigate,
	choose
}: {
	view: 'day' | 'week' | 'month'
	first: Date
	current: Date
	today: string
	navigate: (n: number) => void
	choose: (v: string) => void
}) {
	return (
		<div className='th-planner-nav'>
			<button className='th-icon-button' aria-label='Previous period' onClick={() => navigate(-1)}>
				<ChevronLeft size={16} />
			</button>
			<strong>
				{view === 'week'
					? `${format(first, 'MMM d')} – ${format(addDays(first, 6), 'MMM d, yyyy')}`
					: format(current, view === 'month' ? 'MMMM yyyy' : 'EEEE, MMM d')}
			</strong>
			<button className='th-icon-button' aria-label='Next period' onClick={() => navigate(1)}>
				<ChevronRight size={16} />
			</button>
			<button className='th-text-link' onClick={() => choose(today)}>
				Today
			</button>
		</div>
	)
}
