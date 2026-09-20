import { format } from 'date-fns'
import { MessageSquare } from 'lucide-react'

import type { MessageContext } from './useMessages'

export function MessageHistory({ ctx, userId }: { ctx: MessageContext; userId: string }) {
	const { loading, messages, error, contact, endRef } = ctx
	return (
		<div
			className='th-message-history'
			role='log'
			aria-label='Conversation messages'
			aria-live='polite'
		>
			{loading ? (
				<div className='th-empty'>Loading conversation…</div>
			) : (
				messages.map(m => (
					<div key={m.id} className={`th-message ${m.sender_id === userId ? 'is-own' : ''}`}>
						<p>{m.body}</p>
						<time dateTime={m.created_at}>{format(new Date(m.created_at), 'MMM d, HH:mm')}</time>
					</div>
				))
			)}
			{!loading && !messages.length && !error && (
				<div className='th-empty'>
					<MessageSquare size={28} style={{ margin: '0 auto 16px' }} />
					<h3>Start something together.</h3>
					<p>{ctx.projectId === 'general' ? 'Share an idea or plan your next project' : `Discuss ${ctx.sharedProjects.find(p => p.id === ctx.projectId)?.name}`} with {contact?.name || 'your teammate'}.</p>
				</div>
			)}
			<div ref={endRef} />
		</div>
	)
}
