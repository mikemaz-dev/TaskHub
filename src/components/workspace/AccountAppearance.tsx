'use client'

import { Monitor, Moon, ShieldCheck, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useSyncExternalStore } from 'react'

import { AccentPicker } from './AccentProvider'

export function AccountAppearance() {
	const { theme, setTheme } = useTheme()
	const mounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false
	)
	return (
		<div className='th-settings-side'>
			<section className='th-panel th-card'>
				<h2>Appearance preferences</h2>
				<p className='th-small th-muted' style={{ margin: '8px 0 24px' }}>
					A workspace that feels like you. Saved on this device.
				</p>
				<div className='th-theme-options'>
					{[
						{ value: 'dark', title: 'Dark mode', Icon: Moon },
						{ value: 'light', title: 'Light mode', Icon: Sun },
						{ value: 'system', title: 'System default', Icon: Monitor }
					].map(({ value, title, Icon }) => (
						<button
							key={value}
							onClick={() => setTheme(value)}
							aria-pressed={mounted && theme === value}
							className={`th-theme-option th-theme-${value}`}
						>
							<div>
								<Icon size={22} />
								<span />
								<span />
							</div>
							<strong>{title}</strong>
						</button>
					))}
				</div>
				<AccentPicker />
			</section>
			<section className='th-panel th-card'>
				<ShieldCheck size={25} style={{ color: 'var(--primary)' }} />
				<h2 style={{ margin: '16px 0 8px' }}>Your account</h2>
				<p className='th-small th-muted'>
					You sign in with a secure email link. Your email is used for access to this account.
				</p>
				<p className='th-small th-muted' style={{ marginTop: 12 }}>
					Project invitations and conversations are available from your team workspace.
				</p>
				<Link
					className='th-button th-button-subtle'
					style={{ marginTop: 20 }}
					href='/dashboard/team'
				>
					Manage your team
				</Link>
			</section>
		</div>
	)
}
