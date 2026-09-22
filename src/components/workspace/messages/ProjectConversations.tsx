import { useProjectUnread } from './useProjectUnread'
import { Folder } from 'lucide-react'
import type { MessageContext } from './useMessages'

export function ProjectConversations({ ctx }: { ctx: MessageContext }) {
	const unread = useProjectUnread(ctx.contactId)
	return (
		<nav className='th-conversation-projects' aria-label='Project conversations'>
			<span><Folder size={14} /> Conversations</span>
			<div>
				{[{ id: 'general', name: 'General', color: 'var(--muted-foreground)' }, ...ctx.sharedProjects].map(project => (
					<button key={project.id} type='button' aria-pressed={ctx.projectId === project.id}
						disabled={ctx.busy} onClick={() => ctx.setSelectedProject(project.id)}>
						<i style={{ background: project.color || 'var(--accent)' }} />{project.name}
						{!!unread[project.id] && <span className='th-unread-badge'>{unread[project.id]}</span>}
					</button>
				))}
			</div>
		</nav>
	)
}
