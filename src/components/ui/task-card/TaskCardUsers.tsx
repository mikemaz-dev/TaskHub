import Image from 'next/image'

import type { TTask } from '@/types/tasks/task.types'

interface Props {
	task: TTask
}

export function TaskCardUsers({ task }: Props) {
	return (
		<div className='flex -space-x-2'>
			{task.task_participants
				?.filter(u => Boolean(u.profile))
				.slice(0, 3)
				.map((user, index) => (
					<Image
						key={user.profile.id}
						alt={user.profile.name || 'User avatar'}
						src={user.profile.avatar_path ? user.profile.avatar_path : '/images/default-avatar.png'}
						width={32}
						height={32}
						className='rounded-full border border-white shadow-sm dark:border-neutral-600'
						style={{ zIndex: 10 - index }}
					/>
				))}
			{task.task_participants?.length > 3 && (
				<div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-medium text-gray-600'>
					+{task.task_participants?.length - 3}
				</div>
			)}
		</div>
	)
}
