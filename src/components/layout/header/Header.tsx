'use client'

import { MessageCircleMore, PanelLeftOpen } from 'lucide-react'
import dynamic from 'next/dynamic'

import { Heading, SkeletonLoader } from '@/components/ui'
import { SearchField } from '@/components/ui/search-field/SearchField'

const DynamicThemeToggle = dynamic(
	() => import('@/components/ui/ThemeToggle').then(mod => mod.ThemeToggle),
	{
		ssr: false,
		loading: () => <SkeletonLoader className='size-9' />
	}
)

export function Header() {
	return (
		<div className='flex items-center justify-between mt-6 md:flex-col md:gap-4 md:items-start'>
			<div className='flex items-center justify-between w-full'>
				<div className='flex items-center gap-2.5'>
					<button>
						<PanelLeftOpen
							className='hidden md:block lg:block xl:block opacity-60  transition-opacity'
							absoluteStrokeWidth
						/>
					</button>
					<Heading>Dashboard</Heading>
				</div>
				<div className='hidden md:flex items-center gap-3'>
					<button className='p-2 xl:block rounded-full bg-white shadow-sm cursor-pointer dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors duration-200'>
						<MessageCircleMore size={20} />
					</button>
					<DynamicThemeToggle />
				</div>
			</div>
			<div className='flex items-center justify-center md:justify-between md:w-full gap-2'>
				<SearchField
					value=''
					onChange={() => {}}
				/>
				<div className='md:hidden flex items-center justify-center gap-2'>
					<button className='p-2 rounded-full hidden xl:block bg-white shadow-sm cursor-pointer dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors duration-200'>
						<MessageCircleMore size={20} />
					</button>
					<DynamicThemeToggle />
				</div>
			</div>
		</div>
	)
}
