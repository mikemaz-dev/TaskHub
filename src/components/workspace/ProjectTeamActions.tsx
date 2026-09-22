'use client'
import { MessageSquare, Users } from 'lucide-react'
import Link from 'next/link'
export function ProjectTeamActions({ id, role, archived }: { id: string; role: string; archived: boolean }) {
	function showTeam() {
		const team = document.getElementById('project-members')
		team?.scrollIntoView({ block: 'start', behavior: 'smooth' })
		team?.focus({ preventScroll: true })
	}
	return <div className='th-project-team-actions'>
		<Link className='th-button th-button-subtle' href={`/dashboard/messages?project=${id}`}>
			<MessageSquare size={16} />Project chat
		</Link>
		{role !== 'member' && !archived && <button type='button' className='th-button th-button-subtle' onClick={showTeam}>
			<Users size={16} />Invite & manage team
		</button>}
	</div>
}
