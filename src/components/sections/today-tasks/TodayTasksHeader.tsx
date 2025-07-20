import Image from 'next/image'

import { SectionHeading } from '@/components/ui'

import { USERS_DATA } from '@/data/users/users.data'

export function TodayTasksHeader() {
	const remainingUsers = Math.max(0, USERS_DATA.length - 4)

	return (
		<div className='flex w-full items-center justify-between'>
			<SectionHeading title='Today Tasks' />
			<div className='flex items-center -space-x-3.5'>
				{USERS_DATA.slice(0, 4).map((user, index) => (
					<Image
						key={user.id}
						src={user.avatar ? user.avatar : '/images/default-avatar.png'}
						alt={user.name}
						width={50}
						height={50}
						className='rounded-full border-2 border-white shadow-sm dark:border-neutral-800'
						style={{ zIndex: 10 - index }}
					/>
				))}
				{remainingUsers ? (
					<div className='z-10 flex size-12 items-center justify-center rounded-full border-2 border-neutral-100 bg-violet-400 text-lg text-white shadow-sm dark:border-transparent'>
						+ {remainingUsers}
					</div>
				) : null}
			</div>
		</div>
	)
}
