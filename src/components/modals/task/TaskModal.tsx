'use client'

import { useQuery } from '@tanstack/react-query'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

import { Modal } from '@/components/ui'
import { TaskChecklist } from '@/components/workspace/TaskChecklist'

import { TaskEditorTabs } from './TaskEditorTabs'
import { TaskFields } from './TaskFields'
import { useProjects } from './useProjects'
import { useTaskForm } from './useTaskForm'
import { useTaskPermission } from './useTaskPermission'
import { getClientProjectProfiles } from '@/services/profile/profile-client.service'
import type { TTask } from '@/types/tasks/task.types'

export function TaskModal({
	isOpen,
	setIsOpen,
	mode,
	task,
	projectId,
	initialDate,
	initialTime,
	readOnly: forcedReadOnly = false
}: {
	isOpen: boolean
	setIsOpen: (open: boolean) => void
	mode: 'create' | 'edit'
	task?: TTask
	projectId?: string
	initialDate?: string
	initialTime?: string
	readOnly?: boolean
}) {
	const { form, isPending, onSubmit, isLoading } = useTaskForm({
		mode,
		taskId: task?.id,
		projectId,
		initialDate,
		initialTime,
		onClose: () => setIsOpen(false)
	})
	const { data: projects, error } = useProjects()
	const [tab, setTab] = useState<'details' | 'checklist'>('details')
	const permission = useTaskPermission(mode === 'edit' ? task?.id : undefined)
	const readOnly = forcedReadOnly || (mode === 'edit' && permission.data !== true)
	const selectedProject = form.watch('project_id')
	const participants = form.watch('participants') || []
	const { data: people = [] } = useQuery({
		queryKey: ['profiles', selectedProject],
		queryFn: () => getClientProjectProfiles(selectedProject),
		enabled: !!selectedProject
	})
	const errors = form.formState.errors
	return (
		<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
			<div className='th-task-editor'>
				{readOnly && mode === 'edit' && (
					<p className='th-small th-muted'>
						View only. Editing is available to the task creator, assignees and project
						administrators while the project is active.
					</p>
				)}
				<div className='th-editor-heading'>
					<span className='th-icon-tile'>
						<CheckCircle2 size={22} />
					</span>
					<div>
						<h2>{mode === 'create' ? 'Create a task' : 'Edit task'}</h2>
						<p>{mode === 'create' ? 'Turn the next step into a clear plan.' : task?.title}</p>
					</div>
				</div>
				{task && <TaskEditorTabs tab={tab} setTab={setTab} />}
				{!projects ? (
					<p role='status'>
						{error ? 'Could not load projects. Close and retry.' : 'Loading projects…'}
					</p>
				) : tab === 'checklist' && task ? (
					<TaskChecklist taskId={task.id} readOnly={readOnly} onDeleted={() => setIsOpen(false)} />
				) : (
					<form className='th-task-form' onSubmit={form.handleSubmit(onSubmit)}>
						<TaskFields
							form={form}
							isPending={isPending}
							isLoading={isLoading}
							readOnly={readOnly}
							errors={errors}
							selectedProject={selectedProject}
							projects={projects}
							task={task}
							mode={mode}
							participants={participants}
							people={people}
						/>
						<footer className='th-editor-footer'>
							<button
								type='button'
								className='th-button th-button-subtle'
								onClick={() => setIsOpen(false)}
							>
								Cancel
							</button>
							<button
								className='th-button'
								disabled={isPending || isLoading || !projects.length || readOnly}
							>
								{isPending ? 'Saving…' : mode === 'create' ? 'Create task' : 'Save changes'}
							</button>
						</footer>
					</form>
				)}
			</div>
		</Modal>
	)
}
