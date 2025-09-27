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
		<div className='focus-within:ring-primary focus-within:ring-offset-1.5 base-round dark:bg-secondary/80 dark:focus-within:ring-offset-secondary flex max-w-md items-center gap-2 bg-white p-2.5 shadow-sm transition-all duration-300 focus-within:text-neutral-200 focus-within:ring-2 focus-within:ring-offset-white md:w-full md:justify-start'>
			<SearchIcon
				size={22}
				className='text-gray-500 dark:text-white/70'
			/>
			<input
				type='search'
				placeholder={placeholder}
				value={value}
				onChange={e => onChange(e.target.value)}
				className='flex-1 bg-transparent font-medium text-neutral-500 outline-none placeholder:text-neutral-400 dark:placeholder:text-white/35'
				aria-label={`Search ${value}`}
			/>
		</div>
	)
}
