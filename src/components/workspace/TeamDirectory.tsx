'use client'

import { MessageSquare } from 'lucide-react'
import Link from 'next/link'

import { WorkStatus } from './availability/WorkStatus'
import { Avatar } from './Avatar'
import type { getTeamNetwork } from '@/services/team/team-server.service'

export function TeamDirectory({
	network
}: {
	network: Awaited<ReturnType<typeof getTeamNetwork>>
}) {
	return (
		<div className='th-team-grid'>
			{network.members.map(member => (
				<article className='th-panel th-team-card' key={member.id}>
					<Avatar name={member.name || member.nick} path={member.avatar_path} large />
					<h2>
						{member.name || member.nick || 'Team member'}
						{member.id === network.userId && <small> (you)</small>}
					</h2>
					<p>{member.profession || 'Project collaborator'}</p>
					<WorkStatus value={member.work_schedule} />
					<div className='th-team-card-projects'>
						{network.projects
							.filter(
								p =>
									p.owner_id === member.id ||
									p.project_participants.some(m => m.profile?.id === member.id)
							)
							.map(p => (
								<span className='th-pill' key={p.id}>
									{p.name}
								</span>
							))}
					</div>
					{member.id !== network.userId && (
						<Link
							href={`/dashboard/messages?contact=${member.id}`}
							className='th-button th-button-subtle'
						>
							<MessageSquare size={16} />
							Message
						</Link>
					)}
				</article>
			))}
		</div>
	)
}
