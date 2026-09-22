import { csvCell, summarizeTasks } from './metrics'
import type { TGetProjectsResponse } from '@/types/project/project.types'

type ReportRow = ReturnType<typeof summarizeTasks> & { project: TGetProjectsResponse[number] }
export function exportReportCSV(rows: ReportRow[], from: string, to: string) {
	const lines = [
		['Project', 'Total tasks', 'Completed', 'Active', 'Overdue', 'Completion rate'],
		...rows.map(r => [
			r.project.name ?? 'Untitled',
			r.total,
			r.completed,
			r.active,
			r.overdue,
			`${r.completionRate}%`
		])
	]
	const blob = new Blob(['\uFEFF' + lines.map(r => r.map(csvCell).join(',')).join('\r\n')], {
		type: 'text/csv;charset=utf-8'
	})
	const url = URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = `taskhub-report-${from}-${to}.csv`
	a.click()
	setTimeout(() => URL.revokeObjectURL(url), 1000)
}
