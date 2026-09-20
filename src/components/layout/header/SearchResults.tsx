'use client'

import { ArrowUpRight, CalendarDays, ListTodo } from 'lucide-react'
import Link from 'next/link'

import { useTaskSearch } from './useTaskSearch'

export function SearchResults({
	query,
	results,
	status,
	setQuery,
	setOpen
}: {
	query: string
	results: ReturnType<typeof useTaskSearch>['results']
	status: string
	setQuery: (v: string) => void
	setOpen: (v: boolean) => void
}) {
	return (
		<div id='task-search-results' className='th-search-results th-panel'>
			<div className='th-search-caption'>
				<ListTodo size={15} />
				{query ? `${results.length} matching tasks` : 'Search your workspace'}
			</div>
			{!query ? (
				<p>Search by task name. Results include project and due date.</p>
			) : status ? (
				<p role='status'>{status}</p>
			) : (
				results.map(task => (
					<Link
						key={task.id}
						href={`/dashboard?task=${task.id}`}
						onClick={() => {
							setQuery('')
							setOpen(false)
						}}
					>
						<span className='th-search-icon'>
							<ListTodo size={18} />
						</span>
						<span>
							<strong>{task.title}</strong>
							<small>
								{task.project?.name || 'Personal task'}
								<span>
									<CalendarDays size={11} />
									{task.due_date}
								</span>
							</small>
						</span>
						<ArrowUpRight size={16} />
					</Link>
				))
			)}
		</div>
	)
}
