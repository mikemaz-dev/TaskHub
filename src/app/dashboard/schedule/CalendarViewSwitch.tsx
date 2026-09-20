'use client'

export function CalendarViewSwitch({
	view,
	setView
}: {
	view: 'day' | 'week' | 'month'
	setView: (v: 'day' | 'week' | 'month') => void
}) {
	return (
		<div className='th-section-title'>
			<h2>
				{view === 'month' ? 'Monthly planner' : view === 'day' ? 'Daily planner' : 'Weekly planner'}
			</h2>
			<div className='th-segmented'>
				{(['day', 'week', 'month'] as const).map(v => (
					<button key={v} aria-pressed={v === view} onClick={() => setView(v)}>
						{v}
					</button>
				))}
			</div>
		</div>
	)
}
