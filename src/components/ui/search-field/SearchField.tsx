import { SearchIcon } from '@/components/ui/icons/search'

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
		<div className='focus-within:ring-primary focus-within:ring-offset-1.5 flex max-w-md items-center gap-2 rounded-full bg-white p-2.5 shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-white md:w-full md:justify-start dark:bg-neutral-800 dark:focus-within:ring-offset-neutral-800'>
			<SearchIcon
				size={22}
				className='text-gray-500 dark:text-neutral-500'
			/>
			<input
				type='search'
				placeholder={placeholder}
				value={value}
				onChange={e => onChange(e.target.value)}
				className='flex-1 bg-transparent font-medium text-neutral-500 outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500'
				aria-label={`Search ${value}`}
			/>
		</div>
	)
}
