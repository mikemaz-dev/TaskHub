import { format } from 'date-fns'
import { ChevronLeft, UserRoundPlus } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Header } from '@/components/layout/header/Header'
import { Button } from '@/components/ui'
import SectionHeading from '@/components/ui/SectionHeading'
import { Users } from '@/components/ui/Users'
import TaskCard from '@/components/ui/task-card/TaskCard'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Pages } from '@/config/public-page.config'

import { getProjectServerBySlug } from '@/services/projects/project-server.service'

export const metadata: Metadata = {
	title: 'Projects',
	...NO_INDEX_PAGE
}

interface Props {
	params: Promise<{ slug: string }>
}

export default async function Page(params: Props) {
	const { slug } = await params.params

	const project = await getProjectServerBySlug(slug)
	const tasks = (project.data && project.data[0].task) || []

	if (!project?.data || project.data.length === 0) return <div>Project not found</div>

	if (tasks.length === 0) return <div>Tasks not found</div>

	return (
		<div className='bg-background flex flex-col gap-10 pr-6 pl-6 md:p-6 md:pt-0 lg:p-6 lg:pt-0 xl:w-screen xl:p-6 xl:pt-0'>
			<Header title='Project details' />
			<div className='bg-secondary/20 flex w-full items-center justify-between rounded-2xl border px-6 py-4'>
				<div className='flex items-center gap-15'>
					<div className='flex flex-col items-start gap-0.5'>
						<Link
							href={Pages.DASHBOARD}
							className='text-foreground my-1 flex items-center justify-center gap-1 p-0! text-xs uppercase opacity-60 hover:underline'
						>
							<ChevronLeft size={20} />
							Back to dashboard
						</Link>
						<p className='text-2xl font-bold'>{project.data && project.data[0].name}</p>
					</div>
					<div className='flex flex-col items-start justify-between gap-0.5'>
						<span className='text-foreground my-2 text-xs uppercase opacity-60'>Deadline</span>
						<p className='text-2xl font-bold'>
							{project.data?.[0]?.deadline
								? format(new Date(project.data[0].deadline), 'd MMMM yyyy')
								: 'No deadline'}
						</p>
					</div>
					<div className='flex flex-col items-start justify-between gap-0.5'>
						<span className='text-foreground my-2 text-xs uppercase opacity-60'>
							members
						</span>
						<Users users={project.data && project.data[0].project_participants} />
					</div>
				</div>
				<div>
					<Button size='lg'>
						<UserRoundPlus />
						Add people
					</Button>
				</div>
			</div>
			<div className='flex flex-col gap-5.5 rounded-2xl'>
				<SectionHeading title='Tasks' />
				<div className='grid grid-cols-3 gap-5 md:grid-cols-1 xl:grid-cols-3'>
					{tasks.map(task => (
						<TaskCard
							key={task.id}
							task={task}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
