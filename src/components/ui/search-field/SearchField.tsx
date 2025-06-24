'use client'

import { Search } from 'lucide-react'

interface ISearchField {
	placeholder?: string
	onChange: (value: string) => void
	value: string
}

export function SearchField({
	placeholder = 'Search something...',
	onChange,
	value
}: ISearchField) {
	return (
		<div className='flex items-center justify-center gap-2 max-w-md p-2.5 rounded-full shadow-sm bg-white dark:bg-neutral-800'>
			<Search
				size={22}
				className='text-gray-500 dark:text-neutral-500'
			/>
			<input
				type='search'
				placeholder={placeholder}
				value={value}
				onChange={e => onChange(e.target.value)}
				className='bg-transparent outline-none text-neutral-500 dark:placeholder:text-neutral-500 font-medium'
			/>
		</div>
	)
}
