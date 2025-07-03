'use client'

interface IIconSearch {
	searchTerm: string
	onSearchChange: (term: string) => void
}

export function IconSelectorSearch({ searchTerm, onSearchChange }: IIconSearch) {
	return (
		<div className='border-b border-gray-200 p-3 dark:border-neutral-600'>
			<input
				type='text'
				placeholder='Search icons...'
				value={searchTerm}
				onChange={e => onSearchChange(e.target.value)}
				className='focus:ring-primary/50 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400'
				autoFocus
			/>
		</div>
	)
}
