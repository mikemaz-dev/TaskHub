import Image from 'next/image'

import { getAvatarUrl } from '@/utils/getAvatarUrl'

import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'
import { TGetTasksResponse } from '@/types/tasks/task.types'

export function Users({ users }: { users: TGetTasksResponse[0]['task_participants'] }) {
	if (!users) return null

	return (
		<div className='flex -space-x-2'>
			{users.slice(0, 3).map((user, index) => (
				<Tooltip key={user.profile.id}>
					<TooltipTrigger>
						<Image
							alt={user.profile.name || 'User avatar'}
							src={getAvatarUrl(user.profile.avatar_path ?? '')}
							width={32}
							height={32}
							className='rounded-full border border-white shadow-sm dark:border-neutral-600'
							style={{ zIndex: 10 - index }}
							unoptimized
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
