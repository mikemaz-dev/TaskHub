import { ChevronDown } from 'lucide-react'

import { PROFILE } from '@/components/layout/sidebar/data/profile.data'

export function ProfileCard() {
	return (
		<div className='flex items-center justify-between p-2 bg-gray-100 dark:bg-black/25 rounded-2xl'>
			<div className='flex items-center gap-2'>
				{PROFILE.avatar ? (
					<img
						src={PROFILE.avatar}
						alt='avatar'
						className='w-10 h-10 rounded-full'
					/>
				) : (
					<div className='w-10 h-10 rounded-full bg-blue-500' />
				)}
				<div className='flex flex-col'>
					<p className='font-bold'>{PROFILE.name}</p>
					<p className='text-gray-500 dark:text-neutral-500 text-sm font-medium truncate'>
						{PROFILE.email}
					</p>
				</div>
			</div>
			<button className='cursor-pointer'>
				<ChevronDown
					size={20}
					className='text-gray-500 hover:text-gray-700 dark:hover:text-neutral-300 transition-colors duration-200'
				/>
			</button>
		</div>
	)
}
