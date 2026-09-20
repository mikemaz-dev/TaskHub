'use client'

import { CheckCircle2 } from 'lucide-react'

import { Avatar } from '@/components/workspace/Avatar'

import { useTaskForm } from './useTaskForm'
import { getClientProjectProfiles } from '@/services/profile/profile-client.service'

export function TaskParticipants({
	form,
	participants,
	people,
	selectedProject
}: {
	form: ReturnType<typeof useTaskForm>['form']
	participants: string[]
	people: Awaited<ReturnType<typeof getClientProjectProfiles>>
	selectedProject: string
}) {
	return (
		<div className='th-field' data-field='participants'>
			<span>
				Participants <small>{participants.length} selected</small>
			</span>
			{people.length ? (
				<div className='th-people-select'>
					{people.map(p => (
						<button
							type='button'
							key={p.id}
							aria-pressed={participants.includes(p.id)}
							onClick={() =>
								form.setValue(
									'participants',
									participants.includes(p.id)
										? participants.filter(id => id !== p.id)
										: [...participants, p.id]
								)
							}
						>
							<Avatar name={p.name} path={p.avatar_path} />
							<span>{p.name || p.nick}</span>
							{participants.includes(p.id) && <CheckCircle2 size={15} />}
						</button>
					))}
				</div>
			) : (
				<p className='th-small th-muted'>
					{selectedProject
						? 'Invite teammates from the Team page to assign them.'
						: 'Choose a project to see its members.'}
				</p>
			)}
		</div>
	)
}
