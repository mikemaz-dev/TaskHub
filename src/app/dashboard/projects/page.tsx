import type { Metadata } from 'next'

import { Header } from '@/components/layout/header/Header'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { formatDueDate } from '@/utils/date/date.utl'

import { getProjectsServer } from '@/services/projects/project-server.service'

export const metadata: Metadata = {
	title: 'Projects',
	...NO_INDEX_PAGE
}

export default async function Page() {
	const projects = await getProjectsServer()

	console.log(projects.data?.map(project => project.color))

	return (
		<div className='px-6 md:p-6 md:pt-0 lg:p-6 lg:pt-0 xl:w-screen xl:p-6 xl:pt-0'>
			<Header title='Projects' />

			<div className='mt-6 grid grid-cols-5 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				{projects.data?.map(project => {
					if (!project || !project.deadline) return null
					return (
						<div
							key={project.id}
							className='rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-neutral-800'
						>
							<div>{formatDueDate(project.deadline)}</div>
							{project.name}
						</div>
					)
				})}
			</div>
		</div>
	)
}
