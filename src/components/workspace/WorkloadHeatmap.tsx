'use client'

import { format } from 'date-fns'

export function WorkloadHeatmap({ heatmap }: { heatmap: { date: string; count: number }[] }) {
	return (
		<div className='th-heatmap'>
			{heatmap.map(day => (
				<div
					key={day.date}
					tabIndex={0}
					role='img'
					aria-label={`${day.date}: ${day.count} scheduled tasks`}
					data-tooltip={`${format(new Date(day.date + 'T12:00:00'), 'EEE, MMM d')} · ${day.count} ${day.count === 1 ? 'task' : 'tasks'}`}
					style={{
						background: day.count
							? `color-mix(in srgb,var(--accent) ${Math.min(100, 25 + day.count * 15)}%,var(--surface))`
							: 'var(--surface)'
					}}
				/>
			))}
		</div>
	)
}
