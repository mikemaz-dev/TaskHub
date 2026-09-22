'use client'

import {
	Info,
	Archive,
	BarChart3,
	Bell,
	CalendarDays,
	FileText,
	LayoutGrid,
	MessageSquare,
	Settings,
	Users
} from 'lucide-react'
import Link from 'next/link'

import { useInbox } from '@/components/workspace/InboxProvider'

const menu = [
	['Dashboard', '/dashboard', LayoutGrid],
	['Messages', '/dashboard/messages', MessageSquare],
	['Insight', '/dashboard/insight', BarChart3],
	['Team', '/dashboard/team', Users],
	['Schedule', '/dashboard/schedule', CalendarDays],
	['Report', '/dashboard/report', FileText],
	['Notifications', '/dashboard/notifications', Bell],
	['Archive', '/dashboard/archive', Archive],
	['Settings', '/dashboard/account', Settings],
	['About TaskHub', '/dashboard/about', Info]
] as const
export function SidebarNavigation({
	pathname,
	inbox,
	setOpen
}: {
	pathname: string
	inbox: ReturnType<typeof useInbox>
	setOpen: (v: boolean) => void
}) {
	return (
		<nav aria-label='Main navigation'>
			<p className='th-nav-label'>Main menu</p>
			{menu.map(([name, href, Icon]) => (
				<Link
					key={href}
					href={href}
					onClick={() => setOpen(false)}
					className={`th-nav-link ${pathname === href ? 'is-active' : ''}`}
					aria-current={pathname === href ? 'page' : undefined}
				>
					<Icon size={18} />
					{name}
					{(href === '/dashboard/messages'
						? inbox.messages
						: href === '/dashboard/notifications'
							? inbox.notifications
							: 0) > 0 && (
						<span className='th-unread-badge'>
							{Math.min(99, href === '/dashboard/messages' ? inbox.messages : inbox.notifications)}
						</span>
					)}
				</Link>
			))}
		</nav>
	)
}
