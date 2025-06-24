'use client'

import dynamic from 'next/dynamic'

import { Heading } from '@/components/ui/Heading'
import { SearchField } from '@/components/ui/search-field/SearchField'

const DynamicThemeToggle = dynamic(() =>
	import('@/components/ui/ThemeToggle').then(mod => mod.ThemeToggle)
)

export function Dashboard() {
	return (
		<div className='flex items-center justify-between'>
			<Heading>Dashboard</Heading>
			<div className='flex items-center justify-center gap-2'>
				<SearchField
					value=''
					onChange={() => {}}
				/>
				<DynamicThemeToggle />
			</div>
		</div>
	)
}
