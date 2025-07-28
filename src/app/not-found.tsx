import type { Metadata } from 'next'
import Link from 'next/link'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { Pages } from '@/config/public-page.config'

export const metadata: Metadata = {
	title: '404',
	...NO_INDEX_PAGE
}

export default function Page() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100/80 to-purple-50/20'>
			<p className='text-3xl text-purple-500'>Oh no! Something went wrong</p>
			<h1 className='text-[13.5rem] leading-tight font-semibold text-shadow-lg text-shadow-neutral-700'>
				404
			</h1>
			<Link
				href={Pages.DASHBOARD}
				className='text-primary hover:border-b-primary border-b text-xl font-semibold transition-colors duration-300'
			>
				Go to dashboard page
			</Link>
		</div>
	)
}
