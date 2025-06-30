import Image from 'next/image'

import { SectionHeading } from '@/components/ui'

import { USERS_DATA } from '@/data/users/users.data'

export function TodayTasksHeader() {
	const remainingUsers = Math.max(0, USERS_DATA.length - 4)

	return (
		<div className='flex items-center justify-between w-full'>
			<SectionHeading title='Today Tasks' />
			<div className='flex items-center -space-x-3.5'>
				{USERS_DATA.slice(0, 4).map((user, index) => (
					<Image
						key={user.id}
						src={user.avatar ? user.avatar : '/images/default-avatar.png'}
						alt={user.name}
						width={50}
						height={50}
						className='rounded-full border-2 border-white dark:border-neutral-800 shadow-sm'
						style={{ zIndex: 10 - index }}
					/>
				))}
				{remainingUsers && (
					<div className='size-12 z-10 bg-violet-400 rounded-full border-2 border-neutral-100 dark:border-transparent flex items-center justify-center text-white text-lg shadow-sm'>
						+ {remainingUsers}
					</div>
				)}
			</div>
		</div>
	)
}
