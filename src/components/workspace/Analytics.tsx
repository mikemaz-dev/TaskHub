'use client'

import { format, startOfMonth, subDays } from 'date-fns'
import { CheckCircle2, Clock3, ListTodo, TriangleAlert } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Header } from '@/components/layout/header/Header'

import { AnalyticsCharts } from './AnalyticsCharts'
import { ReportTable } from './ReportTable'
import { ReportToolbar } from './ReportToolbar'
import { WorkloadHeatmap } from './WorkloadHeatmap'
import { exportReportCSV } from '@/lib/analytics/export-report'
import { summarizeTasks } from '@/lib/analytics/metrics'
import type { TGetProjectsResponse } from '@/types/project/project.types'
import type { TGetTasksResponse } from '@/types/tasks/task.types'

export function Analytics({
	tasks,
	projects,
	report = false
}: {
	tasks: TGetTasksResponse
	projects: TGetProjectsResponse
	report?: boolean
}) {
	const [from, setFrom] = useState(format(startOfMonth(new Date()), 'yyyy-MM-dd'))
	const [to, setTo] = useState(format(new Date(), 'yyyy-MM-dd'))
	const today = format(new Date(), 'yyyy-MM-dd')
	const filtered = useMemo(
		() => (report ? tasks.filter(t => t.due_date >= from && t.due_date <= to) : tasks),
		[tasks, report, from, to]
	)
	const stats = summarizeTasks(filtered, today)
	const rows = projects.map(project => ({
		project,
		...summarizeTasks(
			filtered.filter(t => t.project_id === project.id),
			today
		)
	}))
	const heatmap = Array.from({ length: 91 }, (_, i) => {
		const date = format(subDays(new Date(), 90 - i), 'yyyy-MM-dd')
		return { date, count: tasks.filter(t => t.due_date === date).length }
	})
	const cards = [
		{ title: 'Total tasks', value: stats.total, Icon: ListTodo, color: 'var(--accent)' },
		{ title: 'Completed', value: stats.completed, Icon: CheckCircle2, color: '#10b981' },
		{ title: 'In progress', value: stats.active, Icon: Clock3, color: '#f59e0b' },
		{ title: 'Overdue', value: stats.overdue, Icon: TriangleAlert, color: '#f87171' }
	]
	return (
		<div className={`th-page ${report ? 'th-report' : ''}`}>
			<Header title={report ? 'Reports & performance' : 'Insights & analytics'} />
			{report && (
				<ReportToolbar
					from={from}
					to={to}
					setFrom={setFrom}
					setTo={setTo}
					exportCSV={() => exportReportCSV(rows, from, to)}
				/>
			)}
			<div className='th-analytics-metrics'>
				{cards.map(({ title, value, Icon, color }) => (
					<section key={title} className='th-panel th-card th-metric'>
						<div className='th-section-title'>
							<span className='th-icon-tile' style={{ color, borderColor: `${color}40` }}>
								<Icon size={20} />
							</span>
							<span className='th-small th-muted'>
								{report ? 'Selected dates' : 'All projects'}
							</span>
						</div>
						<p style={{ marginTop: 20 }}>{title}</p>
						<strong>{value}</strong>
					</section>
				))}
			</div>
			<AnalyticsCharts filtered={filtered} stats={stats} />
			{report ? (
				<section className='th-panel th-card'>
					<div className='th-section-title'>
						<h2>Project performance breakdown</h2>
					</div>
					<p className='th-small th-muted' style={{ marginTop: 8 }}>
						Tasks scheduled between {from} and {to}. Completion reflects current checklist progress.
					</p>
					<ReportTable rows={rows} />
					{!rows.length && (
						<div className='th-empty'>Create a project to start building your reports.</div>
					)}
				</section>
			) : (
				<section className='th-panel th-card'>
					<div className='th-section-title'>
						<h2>Workload calendar</h2>
						<span className='th-small th-muted'>Last 13 weeks</span>
					</div>
					<p className='th-small th-muted' style={{ marginTop: 8 }}>
						Scheduled tasks per day. A clear view of your workload, without estimated productivity
						scores.
					</p>
					<WorkloadHeatmap heatmap={heatmap} />
					<div className='th-small th-muted' style={{ textAlign: 'right' }}>
						Less ▪ ▪ ▪ More
					</div>
				</section>
			)}
			<p className='th-small th-muted'>
				Completed tasks have all checklist items checked. Empty checklists are counted as open
				tasks.
			</p>
		</div>
	)
}
