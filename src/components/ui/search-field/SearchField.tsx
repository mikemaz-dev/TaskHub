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
		<div className='flex max-w-md items-center justify-center gap-2 rounded-full bg-white p-2.5 shadow-sm md:w-full md:justify-start dark:bg-neutral-800'>
			<Search
				size={22}
				className='text-gray-500 dark:text-neutral-500'
			/>
			<input
				type='search'
				placeholder={placeholder}
				value={value}
				onChange={e => onChange(e.target.value)}
				className='bg-transparent font-medium text-neutral-500 outline-none dark:placeholder:text-neutral-500'
			/>
		</div>
	)
}
