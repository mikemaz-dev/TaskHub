import { Calendar } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Header } from '@/components/layout/header/Header'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Pages } from '@/config/public-page.config'

import { formatDueDate } from '@/utils/date/date.utl'

import { getServerProjects } from '@/services/projects/project-server.service'
import { format } from 'date-fns'

export const metadata: Metadata = {
	title: 'Projects',
	...NO_INDEX_PAGE
}

export default async function Page() {
	const projects = await getServerProjects()

	return (
		<div className='px-6 md:p-6 md:pt-0 lg:p-6 lg:pt-0 xl:w-screen xl:p-6 xl:pt-0'>
			<Header title='Projects' />

			<div className='mt-6 grid grid-cols-5 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				{projects.data?.map(project => {
					if (!project) return null

					const color = project.color || '#3b82f6'

					return (
						<Link
							href={`${Pages.DASHBOARD}/projects/${project.slug}`}
							key={project.id}
							className='group bg-secondary/30 base-round relative flex flex-col justify-between border shadow-sm transition duration-200 hover:shadow-lg'
							style={{ borderTop: `6px solid ${color}` }}
						>
							<div className='space-y-2 p-4'>
								<div className='flex items-center justify-between'>
									<p className='text-muted-foreground text-xs'>
										Created: {format(project.created_at, 'MMM d')}
									</p>
									<span
										className='h-2 w-2 rounded-full'
										style={{ backgroundColor: color }}
									/>
								</div>
								<h3 className='text-lg font-bold'>{project.name}</h3>
							</div>

							<div className='text-foreground border-border flex items-center gap-1 border-t px-4 py-3 text-sm font-medium'>
								<Calendar size={14} />
								{project.deadline ? formatDueDate(project.deadline) : 'No deadline'}
							</div>
						</Link>
					)
				})}
			</div>
		</div>
	)
}
