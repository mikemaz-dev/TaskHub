'use client'

import { PerformanceChart } from './PerformanceChart'
import { summarizeTasks } from '@/lib/analytics/metrics'
import type { TGetTasksResponse } from '@/types/tasks/task.types'

export function AnalyticsCharts({
	filtered,
	stats
}: {
	filtered: TGetTasksResponse
	stats: ReturnType<typeof summarizeTasks>
}) {
	return (
		<div className='th-insights-grid'>
			<PerformanceChart tasks={filtered} />
			<section className='th-panel th-card'>
				<div className='th-section-title'>
					<h2>Status distribution</h2>
					<span className='th-small th-muted'>{stats.total} tasks</span>
				</div>
				<div
					className='th-status-ring'
					role='img'
					aria-label={`${stats.completionRate}% of tasks complete`}
					style={{
						background: `conic-gradient(var(--accent) ${stats.completionRate}%,var(--muted) 0)`
					}}
				>
					<div>
						<strong>{stats.completionRate}%</strong>
						<span>Completed</span>
					</div>
				</div>
				<div className='th-chart-legend'>
					<span>
						<i style={{ background: 'var(--accent)' }} />
						Complete <strong>{stats.completed}</strong>
					</span>
					<span>
						<i style={{ background: 'var(--muted-foreground)' }} />
						Open <strong>{stats.active}</strong>
					</span>
				</div>
			</section>
		</div>
	)
}
