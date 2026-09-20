'use client'

import { format } from 'date-fns'
import { CheckCircle2, Clock3, Folder, Plus } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Header } from '@/components/layout/header/Header'
import { TaskModal } from '@/components/modals/task/TaskModal'

import { DashboardActivity } from './DashboardActivity'
import { DashboardTasks } from './DashboardTasks'
import { DashboardToday } from './DashboardToday'
import { summarizeTasks } from '@/lib/analytics/metrics'
import type { TGetProjectsResponse } from '@/types/project/project.types'
import type { TGetTasksResponse } from '@/types/tasks/task.types'

export function Dashboard({
	tasks,
	projects
}: {
	tasks: TGetTasksResponse
	projects: TGetProjectsResponse
}) {
	const [creating, setCreating] = useState(false)
	const [selectedLocal, setSelected] = useState<string | null>(null)
	const params = useSearchParams()
	const router = useRouter()
	const selected = selectedLocal ?? params.get('task')
	const today = format(new Date(), 'yyyy-MM-dd')
	const metrics = summarizeTasks(tasks, today)
	const todayTasks = tasks.filter(t => t.due_date === today)
	const task = tasks.find(t => t.id === selected)
	const cards = [
		{
			label: 'Active projects',
			value: projects.length,
			caption: `${tasks.length} tasks across your projects`,
			Icon: Folder,
			color: 'var(--accent)'
		},
		{
			label: 'Ongoing tasks',
			value: metrics.active,
			caption: `${metrics.completed} completed · ${metrics.overdue} overdue`,
			Icon: CheckCircle2,
			color: '#10b981'
		},
		{
			label: 'Planned hours',
			value: `${Math.floor(metrics.minutes / 60)}h ${metrics.minutes % 60}m`,
			caption: 'Scheduled time, not tracked work',
			Icon: Clock3,
			color: '#f59e0b'
		}
	]
	return (
		<div className='th-dashboard'>
			<div className='th-dashboard-main'>
				<Header title='Dashboard' />
				{!projects.length && (
					<section className='th-panel th-welcome'>
						<div>
							<p className='th-small th-muted'>Welcome to your workspace</p>
							<h2>Make room for your next idea.</h2>
							<p>Create a project, add your first task, and invite your team.</p>
						</div>
						<Link href='/dashboard/projects?create=1' className='th-button'>
							<Plus size={16} />
							Create your first project
						</Link>
					</section>
				)}
				<div className='th-metrics'>
					{cards.map(({ label, value, caption, Icon, color }) => (
						<section key={label} className='th-panel th-card th-metric'>
							<div className='th-section-title'>
								<div>
									<p>{label}</p>
									<strong>{value}</strong>
								</div>
								<span className='th-icon-tile' style={{ color, borderColor: `${color}40` }}>
									<Icon size={22} />
								</span>
							</div>
							<small>{caption}</small>
						</section>
					))}
				</div>
				<DashboardTasks tasks={tasks} setSelected={setSelected} setCreating={setCreating} />
				<DashboardToday todayTasks={todayTasks} setSelected={setSelected} />
			</div>
			<DashboardActivity
				projects={projects}
				tasks={tasks}
				today={today}
				setSelected={setSelected}
			/>
			{creating && <TaskModal mode='create' isOpen setIsOpen={setCreating} />}{' '}
			{task && (
				<TaskModal
					key={task.id}
					mode='edit'
					task={task}
					isOpen
					setIsOpen={open => {
						if (!open) {
							setSelected(null)
							router.replace('/dashboard', { scroll: false })
							router.refresh()
						}
					}}
				/>
			)}
		</div>
	)
}
