'use client'

import type { TGetProjectsResponse } from '@/types/project/project.types'

export function ReportTable({
	rows
}: {
	rows: {
		project: TGetProjectsResponse[number]
		total: number
		completed: number
		active: number
		overdue: number
		completionRate: number
	}[]
}) {
	return (
		<div className='th-table-wrap'>
			<table className='th-table'>
				<thead>
					<tr>
						{['Project', 'Tasks', 'Done', 'Active', 'Overdue', 'Rate'].map(t => (
							<th key={t}>{t}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map(r => (
						<tr key={r.project.id}>
							<td>
								<span className='th-table-project'>
									<i style={{ background: r.project.color || 'var(--accent)' }} />
									{r.project.name}
								</span>
							</td>
							<td>{r.total}</td>
							<td>{r.completed}</td>
							<td>{r.active}</td>
							<td>{r.overdue}</td>
							<td>
								<span className='th-rate'>
									<i>
										<i style={{ width: `${r.completionRate}%` }} />
									</i>
									{r.completionRate}%
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
