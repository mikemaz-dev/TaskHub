'use client'

import { localNow } from '@/utils/task-schedule'
import { Folder } from 'lucide-react'
import Link from 'next/link'

import { DatePicker } from '@/components/workspace/controls/DatePicker'
import { Select } from '@/components/workspace/controls/Select'

import { TaskDuration } from './TaskDuration'
import { TaskParticipants } from './TaskParticipants'
import { TaskTimes } from './TaskTimes'
import { useProjects } from './useProjects'
import { useTaskForm } from './useTaskForm'
import { getClientProjectProfiles } from '@/services/profile/profile-client.service'
import type { TTask } from '@/types/tasks/task.types'

export function TaskFields({
	form,
	isPending,
	isLoading,
	readOnly,
	errors,
	selectedProject,
	projects,
	task,
	mode,
	participants,
	people
}: {
	form: ReturnType<typeof useTaskForm>['form']
	isPending: boolean
	isLoading: boolean
	readOnly: boolean
	errors: ReturnType<typeof useTaskForm>['form']['formState']['errors']
	selectedProject: string
	projects: NonNullable<ReturnType<typeof useProjects>['data']>
	task: TTask | undefined
	mode: 'create' | 'edit'
	participants: string[]
	people: Awaited<ReturnType<typeof getClientProjectProfiles>>
}) {
	return (
		<fieldset disabled={isPending || isLoading || readOnly}>
			<label className='th-field'>
				Task name
				<input placeholder='What needs to happen?' maxLength={100} {...form.register('title')} />
				{errors.title && <small className='th-error'>{errors.title.message}</small>}
			</label>
			<div className='th-field'>
				<span>
					<Folder size={14} />
					Project
				</span>
				<Select
					label='Project'
					value={selectedProject}
					options={
						projects.some(p => p.value === selectedProject)
							? projects
							: [
									...projects,
									{
										value: selectedProject,
										label: task?.project?.name || 'Current project'
									}
								]
					}
					placeholder='Choose a project'
					onChange={v => {
						if (mode === 'edit') return
						form.setValue('project_id', v, { shouldValidate: true })
						form.setValue('participants', [])
					}}
				/>
				{errors.project_id && <small className='th-error'>Choose a project</small>}
				{!projects.length && (
					<Link href='/dashboard/projects?create=1' className='th-text-link'>
						Create your first project
					</Link>
				)}
			</div>
			<div className='th-field'>
				<span>Due date</span>
				<DatePicker
					value={form.watch('due_date')}
					onChange={v => form.setValue('due_date', v, { shouldValidate: true })}
					label='Due date'
					min={mode === 'create' ? localNow().date : undefined}
				/>
				{errors.due_date && <small className='th-error'>{errors.due_date.message}</small>}
			</div>
			<TaskTimes form={form} creating={mode === 'create'} />
			{errors.start_time && <small className='th-error'>{errors.start_time.message}</small>}
			{errors.end_time && <small className='th-error'>{errors.end_time.message}</small>}
			<TaskDuration form={form} />
			<TaskParticipants
				form={form}
				participants={participants}
				people={people}
				selectedProject={selectedProject}
			/>
		</fieldset>
	)
}
