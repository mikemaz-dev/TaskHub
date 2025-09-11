import Image from 'next/image'

import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

type Profile = {
	id: string
	avatar_path: string | null
	description: string | null
	name: string | null
	nick: string | null
	profession: string | null
}

type UsersResponse = {
	users: { profile: Profile }[] | null
}

export function Users({ users }: UsersResponse) {
	if (!users) return null

	return (
		<div className='flex -space-x-2'>
			{users.slice(0, 3).map((user, index) => (
				<Tooltip key={user.profile.id}>
					<TooltipTrigger>
						<Image
							alt={user.profile.name || 'User avatar'}
							src={user.profile.avatar_path ?? '/images/default-avatar.png'}
							width={32}
							height={32}
							className='rounded-full border border-white shadow-sm dark:border-neutral-600'
							style={{ zIndex: 10 - index }}
						/>
					</TooltipTrigger>
					<TooltipContent>{user.profile.name}</TooltipContent>
				</Tooltip>
			))}
			{users.length > 3 && (
				<div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-medium text-gray-600'>
					+{users.length - 3}
				</div>
			)}
		</div>
	)
}
