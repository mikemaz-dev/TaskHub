'use client'

import { MessageSquare } from 'lucide-react'
import Link from 'next/link'

import { Header } from '@/components/layout/header/Header'

import { OnlineStatus } from './availability/OnlineStatus'
import { Avatar } from './Avatar'
import { Composer } from './messages/Composer'
import { Contacts } from './messages/Contacts'
import { ProjectConversations } from './messages/ProjectConversations'
import { MessageHistory } from './messages/MessageHistory'
import { type Network, useMessages } from './messages/useMessages'

export function Messages({ network }: { network: Network }) {
	const ctx = useMessages(network)
	const { contact, error, refresh } = ctx

	return (
		<div className='th-page th-chat-page'>
			<Header title={ctx.requestedProject ? `${ctx.requestedProject.name} · Messages` : 'Messages'} />
			<div className='th-section-title'>
				<p className='th-small th-muted'>Conversations with your project teammates.</p>
				<Link href='/dashboard/team' className='th-button th-button-subtle'>
					Invite teammates
				</Link>
			</div>
			<section className='th-panel th-messages'>
				<Contacts ctx={ctx} />
				<div className='th-conversation'>
					{contact ? (
						<>
							<header className='th-conversation-header'>
								<Avatar name={contact.name} path={contact.avatar_path} />
								<div>
									<h2>{contact.name || contact.nick}</h2>
									<OnlineStatus userId={contact.id} />
								</div>
							</header>
							<ProjectConversations ctx={ctx} />
							<MessageHistory ctx={ctx} userId={network.userId} />
							{error && (
								<div className='th-message-error' role='alert'>
									{error}
									<button onClick={() => void refresh()} className='th-text-link'>
										Retry
									</button>
								</div>
							)}
							<div className='th-typing-status' role='status'>{ctx.typing && <><span><i /><i /><i /></span>{contact.name || 'Your teammate'} is typing…</>}</div>
							<Composer ctx={ctx} />
						</>
					) : (
						<div className='th-empty th-conversation-empty'>
							<MessageSquare size={40} />
							<h3>{ctx.requestedProject ? 'Your project conversations' : 'A place for good conversations.'}</h3>
							<p>{ctx.contacts.length ? 'Select a teammate to get started.' : 'No other teammates in this project yet.'}</p>
						</div>
					)}
				</div>
			</section>
		</div>
	)
}
