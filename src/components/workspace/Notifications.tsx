'use client'

import { format } from 'date-fns'
import { Bell, CheckCheck } from 'lucide-react'
import Link from 'next/link'

import { notificationTitle, notificationBody } from '@/data/notification-copy'
import { Header } from '@/components/layout/header/Header'

import { useNotifications } from './useNotifications'

export function Notifications() {
	const { items, error, loading, unread, setUnread, inbox, load, mark } = useNotifications()

	return (
		<div className='th-page'>
			<Header title='Notifications' />
			<section className='th-panel th-card'>
				<div className='th-section-title'>
					<div className='th-segmented'>
						<button aria-pressed={!unread} onClick={() => setUnread(false)}>
							All activity
						</button>
						<button aria-pressed={unread} onClick={() => setUnread(true)}>
							Unread {inbox.notifications || ''}
						</button>
					</div>
					<button
						className='th-button th-button-subtle'
						disabled={!inbox.notifications}
						onClick={() => void mark()}
					>
						<CheckCheck size={16} />
						Mark all read
					</button>
				</div>
				{error ? (
					<div className='th-empty' role='alert'>
						<p>{error}</p>
						<button className='th-button' onClick={() => void load()}>
							Try again
						</button>
					</div>
				) : loading ? (
					<p className='th-empty' role='status'>
						Loading notifications…
					</p>
				) : (
					<div className='th-notification-list'>
						{items
							.filter(n => !unread || !n.read_at)
							.map(n => (
								<article key={n.id} className={n.read_at ? '' : 'is-unread'}>
									<span className='th-icon-tile'>
										<Bell size={18} />
									</span>
									<Link
										href={n.href.startsWith('/dashboard') ? n.href : '/dashboard'}
										onClick={() => void mark(n.id)}
									>
										<strong>{notificationTitle(n.title)}</strong>
										<p>{notificationBody(n.title, n.body)}</p>
										<time>{format(new Date(n.created_at), 'MMM d, HH:mm')}</time>
									</Link>
									{!n.read_at && (
										<button
											className='th-icon-button'
											aria-label={`Mark ${notificationTitle(n.title)} as read`}
											onClick={() => void mark(n.id)}
										>
											<CheckCheck size={15} />
										</button>
									)}
								</article>
							))}
						{!items.filter(n => !unread || !n.read_at).length && (
							<div className='th-empty'>
								<Bell size={28} />
								<h3>You’re all caught up.</h3>
								<p>
									Updates from your teammates will appear here: tasks, project changes and
									invitations.
								</p>
							</div>
						)}
					</div>
				)}
			</section>
		</div>
	)
}
