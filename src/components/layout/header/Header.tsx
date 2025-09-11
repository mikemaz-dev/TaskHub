'use client'

import { MessageCircleMore } from 'lucide-react'
import dynamic from 'next/dynamic'

import { SkeletonLoader } from '@/components/ui'
import Heading from '@/components/ui/Heading'
import { SearchField } from '@/components/ui/search-field/SearchField'

const DynamicThemeToggle = dynamic(
	() => import('@/components/ui/ThemeToggle').then(mod => mod.ThemeToggle),
	{
		ssr: false,
		loading: () => <SkeletonLoader className='size-9' />
	}
)

export function Header({ title }: { title: string }) {
	return (
		<div className='mt-6 flex items-center justify-between md:flex-col md:items-start md:gap-4'>
			<div className='flex w-full items-center justify-between'>
				<Heading>{title}</Heading>
				<div className='hidden items-center gap-3 md:flex'>
					<button className='cursor-pointer rounded-full bg-white p-2 shadow-sm transition-colors duration-200 hover:bg-neutral-300 xl:block dark:bg-neutral-800 dark:hover:bg-neutral-700'>
						<MessageCircleMore size={20} />
					</button>
					<DynamicThemeToggle />
				</div>
			</div>
			<div className='flex items-center justify-center gap-2 md:w-full md:justify-between'>
				<SearchField
					value=''
					onChange={() => {}}
				/>
				<div className='flex items-center justify-center gap-2 md:hidden'>
					<button className='hidden cursor-pointer rounded-full bg-white p-2 shadow-sm transition-colors duration-200 hover:bg-neutral-300 xl:block dark:bg-neutral-800 dark:hover:bg-neutral-700'>
						<MessageCircleMore size={20} />
					</button>
					<DynamicThemeToggle />
				</div>
			</div>
		</div>
	)
}
