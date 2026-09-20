'use client'

import { Search, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

import { SearchResults } from './SearchResults'
import { useTaskSearch } from './useTaskSearch'

const ThemeToggle = dynamic(() => import('@/components/ui/ThemeToggle').then(m => m.ThemeToggle), {
	ssr: false
})
export function Header({ title }: { title: string }) {
	const [query, setQuery] = useState('')
	const { results, status } = useTaskSearch(query)
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const input = useRef<HTMLInputElement>(null)
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault()
				input.current?.focus()
				setOpen(true)
			}
		}
		const close = (e: PointerEvent) => {
			if (!ref.current?.contains(e.target as Node)) setOpen(false)
		}
		document.addEventListener('keydown', handler)
		document.addEventListener('pointerdown', close)
		return () => {
			document.removeEventListener('keydown', handler)
			document.removeEventListener('pointerdown', close)
		}
	}, [])

	return (
		<header className='th-header'>
			<div>
				<h1>{title}</h1>
				<p>Your workspace / TaskHub</p>
			</div>
			<div className='th-header-actions'>
				<div
					ref={ref}
					className={`th-search ${open ? 'is-open' : ''}`}
					onKeyDown={e => {
						if (e.key === 'Escape') {
							setOpen(false)
							input.current?.focus()
						}
						if (e.key === 'ArrowDown' && e.target === input.current) {
							e.preventDefault()
							ref.current?.querySelector<HTMLAnchorElement>('.th-search-results a')?.focus()
						}
					}}
				>
					<Search size={17} />
					<input
						ref={input}
						aria-label='Search tasks'
						aria-controls='task-search-results'
						placeholder='Find a task…'
						value={query}
						onFocus={() => setOpen(true)}
						onChange={e => {
							setQuery(e.target.value)
							setOpen(true)
						}}
					/>
					{query ? (
						<button
							aria-label='Clear search'
							onClick={() => {
								setQuery('')
								input.current?.focus()
							}}
						>
							<X size={14} />
						</button>
					) : (
						<kbd>⌘ K</kbd>
					)}
					{open && (
						<SearchResults
							query={query}
							results={results}
							status={status}
							setQuery={setQuery}
							setOpen={setOpen}
						/>
					)}
				</div>
				<ThemeToggle />
			</div>
		</header>
	)
}
