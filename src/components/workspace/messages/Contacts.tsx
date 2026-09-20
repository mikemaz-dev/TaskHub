import { Search } from 'lucide-react'
import Link from 'next/link'

import { OnlineStatus } from '../availability/OnlineStatus'
import { Avatar } from '../Avatar'

import type { MessageContext } from './useMessages'

export function Contacts({ ctx }: { ctx: MessageContext }) {
	const { contacts, contactId, setContactId, query, setQuery } = ctx
	return (
		<aside className='th-contacts'>
			<div className='th-contact-search'>
				<Search size={15} />
				<input
					aria-label='Search contacts'
					placeholder='Search contact…'
					value={query}
					onChange={e => setQuery(e.target.value)}
				/>
			</div>
			{contacts
				.filter(c => (c.name || c.nick || '').toLowerCase().includes(query.toLowerCase()))
				.map(c => (
					<button
						className={`th-contact ${c.id === contactId ? 'is-active' : ''}`}
						key={c.id}
						onClick={() => {
							setContactId(c.id)
						}}
					>
						<Avatar name={c.name} path={c.avatar_path} />
						<span>
							<strong>{c.name || c.nick || 'Team member'}</strong>
							<OnlineStatus userId={c.id} />
						</span>
					</button>
				))}
			{!contacts.length && (
				<div className='th-empty'>
					<p>Invite someone to a project to start a conversation.</p>
					<Link href='/dashboard/team' className='th-text-link'>
						Open team
					</Link>
				</div>
			)}
		</aside>
	)
}
