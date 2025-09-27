import type { Metadata } from 'next'

import { Header } from '@/components/layout/header/Header'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { getServerTasks } from '@/services'
import { CalendarView } from './CalendarView'

export const metadata: Metadata = {
	title: 'Schedule',
	...NO_INDEX_PAGE
}

export default async function Page() {
	const tasks = await getServerTasks()

	console.log(tasks.data)

	return (
		<section className='bg-background hide-scrollbar flex h-screen flex-col gap-12 overflow-y-scroll px-6 xl:w-screen'>
			<Header title='Schedule' />
			<CalendarView tasks={tasks?.data ?? []} />
		</section>
	) 
}
