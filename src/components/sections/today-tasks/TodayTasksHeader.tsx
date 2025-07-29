'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import SectionHeading from '@/components/ui/SectionHeading'

import { getClientUsers } from '@/services/users/get-users-client'
import type { TGetClientUsersResponse } from '@/types/user/user.types'

interface Props {
	usersData: TGetClientUsersResponse
}

export function TodayTasksHeader({ usersData }: Props) {
	const { data } = useQuery({
		queryKey: ['users'],
		queryFn: () => getClientUsers(),
		placeholderData: usersData
	})

	if (!data) return null

	const remainingUsers = Math.max(0, data.length - 5)

	return (
		<div className='flex w-full items-center justify-between'>
			<SectionHeading title='Today Tasks' />
			<div className='flex items-center -space-x-3.5'>
				{data.slice(0, 4).map((user, index) => (
					<Image
						key={user.id}
						src={user.avatar_path ? user.avatar_path : '/images/default-avatar.png'}
						alt={user.name || 'User avatar'}
						title={user.name || 'User avatar'}
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
