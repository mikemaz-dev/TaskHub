'use client'

import { ArrowLeft, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Header } from '@/components/layout/header/Header'
import { TaskModal } from '@/components/modals/task/TaskModal'

import { ProjectOrigin } from './ProjectOrigin'
import { ProjectTeamActions } from './ProjectTeamActions'
import { ProjectMembers } from './ProjectMembers'
import { ProjectStateActions } from './ProjectStateActions'
import { summarizeTasks, taskProgress } from '@/lib/analytics/metrics'
import type { getServerProjectBySlug } from '@/services/projects/project-server.service'

type Project = NonNullable<Awaited<ReturnType<typeof getServerProjectBySlug>>['data']>[number]
export function ProjectWorkspace({ project, userId }: { project: Project; userId: string }) {
	const role =
		project.owner_id === userId
			? 'owner'
			: project.project_participants.find(m => m.profile_id === userId)?.role || 'member'
	const readonly = !!(project.archived_at || project.completed_at)
	const [creating, setCreating] = useState(false)
	const [selected, setSelected] = useState<string | null>(null)
	const stats = summarizeTasks(project.task, new Date().toLocaleDateString('en-CA'))
	const task = project.task.find(t => t.id === selected)
	return (
		<div className='th-page'>
			<Header title={project.name || 'Project'} />
			<Link href='/dashboard/projects' className='th-button th-button-subtle th-back-projects'>
				<ArrowLeft size={16} />
				All projects
			</Link>
			<section className='th-panel th-card th-project-overview'>
				<div className='th-section-title'>
					<div>
						<h2>{project.name}</h2>
						<div className='th-project-identity'><ProjectOrigin own={role === 'owner'} /><span className='th-pill'>Your role: {role}</span></div>
						<p className='th-muted'>Deadline: {project.deadline || 'No deadline'}</p>
					</div>
					<ProjectTeamActions id={project.id} role={role} archived={!!project.archived_at} />
				</div>
				<div className='th-project-summary'>
					<span>
						<strong>{stats.total}</strong>Tasks
					</span>
					<span>
						<strong>{stats.completed}</strong>Completed
					</span>
					<span>
						<strong>{stats.overdue}</strong>Overdue
					</span>
					<span>
						<strong>{project.project_participants.length + 1}</strong>Members
					</span>
				</div>
			</section>
			<ProjectStateActions
				id={project.id}
				archived={!!project.archived_at}
				completed={!!project.completed_at}
				role={role}
			/>
			{readonly && (
				<p className='th-pill'>
					{project.archived_at ? 'Archived project' : 'Completed project'} · Tasks are read-only
					until reopened.
				</p>
			)}
			<section className='th-panel th-card'>
				<div className='th-section-title'>
					<h2>Project tasks</h2>
					<button className='th-button' disabled={readonly} onClick={() => setCreating(true)}>
						<Plus size={16} />
						New task
					</button>
				</div>
				{project.task.length ? (
					project.task.map(t => (
						<button key={t.id} className='th-progress-task' onClick={() => setSelected(t.id)}>
							<span>
								<span>{t.title}</span>
								<small>
									{t.due_date} · {taskProgress(t)}%
								</small>
							</span>
							<i>
								<i style={{ width: `${taskProgress(t)}%` }} />
							</i>
						</button>
					))
				) : (
					<div className='th-empty'>
						<h3>Your project starts here.</h3>
						<p>Add your first task and break it into small, achievable steps.</p>
					</div>
				)}
			</section>
			<ProjectMembers project={project} userId={userId} />
			{creating && (
				<TaskModal mode='create' projectId={project.id} isOpen setIsOpen={setCreating} />
			)}{' '}
			{task && (
				<TaskModal
					key={task.id}
					mode='edit'
					task={task}
					readOnly={readonly}
					isOpen
					setIsOpen={open => {
						if (!open) setSelected(null)
					}}
				/>
			)}
		</div>
	)
}
