'use client'

import { LogOut, Menu, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { Logo } from '@/components/ui/Logo'
import { ProjectOrigin } from '@/components/workspace/ProjectOrigin'
import { Avatar } from '@/components/workspace/Avatar'
import { useInbox } from '@/components/workspace/InboxProvider'

import { createClient } from '@/utils/supabase/client'

import { SidebarNavigation } from './SidebarNavigation'
import type { TGetProjectsResponse } from '@/types/project/project.types'
import type { TProfile } from '@/types/user/profile.types'

export function Sidebar({
	projects,
	profile
}: {
	projects: TGetProjectsResponse
	profile: TProfile
}) {
	const pathname = usePathname()
	const inbox = useInbox()
	const router = useRouter()
	const [open, setOpen] = useState(false)
	async function signOut() {
		const { error } = await createClient().auth.signOut()
		if (error) {
			toast.error('Could not sign out. Try again.')
			return
		}
		router.replace('/')
		router.refresh()
	}
	return (
		<>
			<div className='th-mobile-bar'>
				<Logo />
				<button
					className='th-icon-button'
					aria-label={open ? 'Close navigation' : 'Open navigation'}
					aria-expanded={open}
					aria-controls='workspace-navigation'
					onClick={() => setOpen(!open)}
				>
					{open ? <X size={20} /> : <Menu size={20} />}
				</button>
			</div>
			{open && (
				<button
					className='th-nav-backdrop'
					aria-label='Close navigation'
					onClick={() => setOpen(false)}
				/>
			)}
			<aside id='workspace-navigation' className={`th-sidebar th-panel ${open ? 'is-open' : ''}`}>
				<Logo />
				<Link
					href='/dashboard/account/profile'
					className='th-profile-link'
					onClick={() => setOpen(false)}
				>
					<Avatar name={profile.name || profile.email} path={profile.avatar_path} />
					<span>
						<strong>{profile.name || 'Your profile'}</strong>
						<small>{profile.profession || 'Your workspace'}</small>
					</span>
				</Link>
				<SidebarNavigation pathname={pathname} inbox={inbox} setOpen={setOpen} />
				<div className='th-sidebar-projects'>
					<div className='th-section-title'>
						<Link href='/dashboard/projects' className='th-nav-label'>
							Projects
						</Link>
						<Link href='/dashboard/projects?create=1' aria-label='Create project'>
							<Plus size={16} />
						</Link>
					</div>
					{projects.length ? (
						projects.map(project => (
							<Link
								onClick={() => setOpen(false)}
								className='th-project-link'
								key={project.id}
								href={`/dashboard/projects/${project.slug || project.id}`}
							>
								<i style={{ background: project.color || '#6366f1' }} />
								<span className='th-sidebar-project-name'>{project.name || 'Untitled project'}</span>
								<ProjectOrigin own={project.owner_id === profile.id} compact />
							</Link>
						))
					) : (
						<p className='th-muted th-small'>Your projects will appear here.</p>
					)}
				</div>
				<button type='button' className='th-nav-link th-signout' onClick={signOut}>
					<LogOut size={17} />
					Sign out
				</button>
			</aside>
		</>
	)
}
