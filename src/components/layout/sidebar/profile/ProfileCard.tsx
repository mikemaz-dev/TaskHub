import { ChevronDown } from 'lucide-react'

import { PROFILE } from '@/data/sidebar/profile.data'

export function ProfileCard() {
	return (
		<div className='flex items-center justify-between rounded-2xl bg-gray-100 p-2 dark:bg-black/25'>
			<div className='flex items-center gap-2'>
				{PROFILE.avatar ? (
					<img
						src={PROFILE.avatar}
						alt='avatar'
						className='h-10 w-10 rounded-full'
					/>
				) : (
					<div className='h-10 w-10 rounded-full bg-blue-500' />
				)}
				<div className='flex flex-col'>
					<p className='font-bold'>{PROFILE.name}</p>
					<p className='truncate text-sm font-medium text-gray-500 dark:text-neutral-500'>
						{PROFILE.email}
					</p>
				</div>
			</div>
			<button className='cursor-pointer'>
				<ChevronDown
					size={20}
					className='text-gray-500 transition-colors duration-200 hover:text-gray-700 dark:hover:text-neutral-300'
				/>
			</button>
		</div>
	)
}
