import { Archive, Folder } from 'lucide-react'
import Link from 'next/link'

import { Header } from '@/components/layout/header/Header'
import { HelpTip } from '@/components/workspace/HelpTip'
import { ProjectStateActions } from '@/components/workspace/ProjectStateActions'

import { getServerAuth } from '@/services/get-server-auth'
import { getServerProjects } from '@/services/projects/project-server.service'

export const metadata = { title: 'Archive' }
export default async function Page() {
	const [{ data, error }, user] = await Promise.all([getServerProjects(true), getServerAuth(true)])
	if (error) throw error
	const projects = data?.filter(p => p.archived_at || p.completed_at) ?? []
	return (
		<div className='th-page'>
			<Header title='Archive' />
			<section className='th-panel th-card'>
				<div className='th-section-title'>
					<h2>
						Finished work, safely kept. <HelpTip topic='archive' />
					</h2>
					<Archive size={22} />
				</div>
				<p className='th-small th-muted' style={{ marginTop: 10 }}>
					Archived and completed projects keep their tasks, checklist items, team and conversations.
					Restore or reopen a project to work on it again.
				</p>
			</section>
			<div className='th-project-grid'>
				{projects.map(p => (
					<article className='th-panel th-card' key={p.id}>
						<Link href={`/dashboard/projects/${p.slug || p.id}`} className='th-archive-project'>
							<Folder size={22} />
							<h2>{p.name}</h2>
							<span className='th-pill'>{p.archived_at ? 'Archived' : 'Completed'}</span>
						</Link>
						<ProjectStateActions
							id={p.id}
							archived={!!p.archived_at}
							completed={!!p.completed_at}
							role={p.owner_id === user!.id ? 'owner' : 'member'}
						/>
					</article>
				))}
			</div>
			{!projects.length && (
				<div className='th-panel th-empty'>
					<Archive size={28} />
					<h3>Nothing in the archive yet.</h3>
					<p>Complete or archive a project from its page. Nothing is permanently deleted here.</p>
					<Link href='/dashboard/projects' className='th-button th-button-subtle'>
						View projects
					</Link>
				</div>
			)}
		</div>
	)
}
