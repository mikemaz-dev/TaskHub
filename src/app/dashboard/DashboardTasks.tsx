'use client'

import { Plus } from 'lucide-react'

import { PerformanceChart } from '@/components/workspace/PerformanceChart'

import { taskProgress } from '@/lib/analytics/metrics'
import type { TGetTasksResponse } from '@/types/tasks/task.types'

export function DashboardTasks({
	tasks,
	setSelected,
	setCreating
}: {
	tasks: TGetTasksResponse
	setSelected: (id: string) => void
	setCreating: (value: boolean) => void
}) {
	return (
		<div className='th-dashboard-middle'>
			<PerformanceChart tasks={tasks} />
			<section className='th-panel th-card'>
				<div className='th-section-title'>
					<h2>Last tasks</h2>
					<button
						className='th-icon-button'
						aria-label='Create task'
						onClick={() => setCreating(true)}
					>
						<Plus size={16} />
					</button>
				</div>
				{tasks.length ? (
					tasks
						.slice(-4)
						.reverse()
						.map(t => (
							<button key={t.id} className='th-progress-task' onClick={() => setSelected(t.id)}>
								<span>
									<span>{t.title}</span>
									<small>{taskProgress(t)}%</small>
								</span>
								<i>
									<i style={{ width: `${taskProgress(t)}%` }} />
								</i>
							</button>
						))
				) : (
					<div className='th-empty'>
						<h3>A fresh start</h3>
						<p>Your next step begins with a task.</p>
						<button className='th-button th-button-subtle' onClick={() => setCreating(true)}>
							Add a task
						</button>
					</div>
				)}
			</section>
		</div>
	)
}
