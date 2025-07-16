import { ChevronDown } from 'lucide-react'

import { PROFILE } from '@/data/sidebar/profile.data'

export function ProfileCard() {
	return (
		<div className='bg-background flex items-center justify-between rounded-3xl px-2.5 py-1.5'>
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
					<p className='text-foreground truncate text-sm font-medium opacity-60'>{PROFILE.email}</p>
				</div>
			</div>
			<button className='cursor-pointer'>
				<ChevronDown
					size={20}
					className='text-foreground opacity-60 transition-opacity duration-300 hover:opacity-100'
				/>
			</button>
		</div>
	)
}
