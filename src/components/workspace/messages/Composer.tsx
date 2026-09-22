import { Send } from 'lucide-react'

import type { MessageContext } from './useMessages'

export function Composer({ ctx }: { ctx: MessageContext }) {
	const { send, projectId, sharedProjects, body, setBody, busy } = ctx
	const project = sharedProjects.find(p => p.id === projectId)
	return (
		<form
			className='th-composer'
			onSubmit={e => {
				e.preventDefault()
				void send()
			}}
		>
			<p className='th-compose-context'>Message in <strong>{projectId === 'general' ? 'General · no project' : project?.name}</strong></p>
			<div>
				<textarea
					aria-label='Message'
					onKeyDown={e => {
						if (
							e.key === 'Enter' &&
							!e.shiftKey &&
							!e.nativeEvent.isComposing &&
							e.nativeEvent.keyCode !== 229
						) {
							e.preventDefault()
							void send()
						}
					}}
					maxLength={4000}
					rows={2}
					value={body}
					onChange={e => { setBody(e.target.value); ctx.notifyTyping(!!e.target.value.trim()) }}
					onBlur={() => ctx.notifyTyping(false)}
					placeholder='Write a message… Enter to send, Shift+Enter for a new line'
				/>
				<button
					type='submit'
					disabled={busy || !body.trim() || !projectId}
					className='th-button'
					aria-label='Send message'
				>
					<Send size={18} />
				</button>
			</div>
		</form>
	)
}
