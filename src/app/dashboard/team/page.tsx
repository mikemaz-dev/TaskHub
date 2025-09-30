import { format } from 'date-fns'
import { ChevronLeft, UserRoundPlus } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Header } from '@/components/layout/header/Header'
import { Button } from '@/components/ui'
import SectionHeading from '@/components/ui/SectionHeading'
import { Users } from '@/components/ui/Users'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Pages } from '@/config/public-page.config'

export const metadata: Metadata = {
	title: 'Team',
	...NO_INDEX_PAGE
}

// Моковые данные команды
const team = {
	name: 'Alpha Team',
	description: 'Команда, которая делает TaskHub лучше каждый день!',
	avatarUrl: 'https://avatars2.githubusercontent.com/u/9919?v=4',
	members: [
		{
			id: '1',
			name: 'Alice Johnson',
			role: 'OWNER',
			avatar: 'https://avatars2.githubusercontent.com/u/1?v=4'
		},
		{
			id: '2',
			name: 'Bob Smith',
			role: 'ADMIN',
			avatar: 'https://avatars2.githubusercontent.com/u/2?v=4'
		},
		{
			id: '3',
			name: 'Charlie Brown',
			role: 'MEMBER',
			avatar: 'https://avatars2.githubusercontent.com/u/3?v=4'
		},
		{
			id: '4',
			name: 'Diana Prince',
			role: 'MEMBER',
			avatar: 'https://avatars2.githubusercontent.com/u/4?v=4'
		}
	],
	projects: [
		{ id: 'p1', name: 'TaskHub Redesign', deadline: '2025-10-10' },
		{ id: 'p2', name: 'API Improvements', deadline: '2025-11-05' }
	]
}

export default function Page() {
	return (
		<section className='bg-background flex min-h-screen flex-col gap-10 pr-6 pl-6 md:p-6 md:pt-0 lg:p-6 lg:pt-0 xl:w-screen xl:p-6 xl:pt-0'>
			<Header title='Team details' />

			<div className='bg-secondary/20 flex w-full items-center justify-between rounded-2xl border px-6 py-4'>
				<div className='flex items-center gap-6'>
					<Image
						src={team.avatarUrl}
						width={80}
						height={80}
						className='rounded-full border-2 border-blue-500'
						alt='Team avatar'
					/>
					<div className='flex flex-col gap-1'>
						<p className='text-2xl font-bold'>{team.name}</p>
						<p className='text-sm  opacity-60'>{team.description}</p>
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
				<SectionHeading title='Projects' />
				<div className='grid grid-cols-3 gap-5 md:grid-cols-1 xl:grid-cols-3'>
					{team.projects.map(project => (
						<div
							key={project.id}
							className='bg-secondary flex flex-col justify-between base-round p-4'
						>
							<p className='text-lg font-semibold'>{project.name}</p>
							<p className='text-xs text-gray-500'>
								Deadline: {format(new Date(project.deadline), 'd MMM yyyy')}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
