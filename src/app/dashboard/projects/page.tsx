import { getServerAuth } from '@/services/get-server-auth'
import { ProjectOrigin } from '@/components/workspace/ProjectOrigin'
import { Folder } from 'lucide-react'
import Link from 'next/link'

import { Header } from '@/components/layout/header/Header'
import { ProjectForm } from '@/components/workspace/ProjectForm'

import { getServerProjects } from '@/services/projects/project-server.service'

export const metadata = { title: 'Projects' }
export default async function Page({
	searchParams
}: {
	searchParams: Promise<{ create?: string }>
}) {
	const [projects, params, user] = await Promise.all([getServerProjects(), searchParams, getServerAuth(true)])
	if (projects.error) throw new Error('Could not load projects.')
	return (
		<div className='th-page'>
			<Header title='Projects' />
			<ProjectForm initialOpen={params.create === '1'} />
			<div className='th-project-grid'>
				{projects.data?.map(project => (
					<Link
						key={project.id}
						className='th-panel th-project-card'
						href={`/dashboard/projects/${project.slug || project.id}`}
					>
						<span className='th-icon-tile' style={{ color: project.color || '#6366f1' }}>
							<Folder size={22} />
						</span>
						<h2>{project.name}</h2>
						<ProjectOrigin own={project.owner_id === user?.id} />
						<p>{project.deadline ? `Due ${project.deadline}` : 'No deadline set'}</p>
						<span className='th-small th-muted'>Open project</span>
					</Link>
				))}
			</div>
			{!projects.data?.length && (
				<section className='th-panel th-empty'>
					<h3>Great work starts with a project.</h3>
					<p>Create one to bring your tasks and team together.</p>
				</section>
			)}
		</div>
	)
}
