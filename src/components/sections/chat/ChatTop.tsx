import Image from 'next/image'
import { memo } from 'react'

import { Button } from '@/components/ui'

import type { Database } from '@/types/db.types'

type TProfile = Database['public']['Tables']['profile']['Row']

function ChatTop({ user }: { user?: TProfile }) {
	return (
		<div className='text-foreground flex flex-col items-center gap-7 self-center'>
			<div className='flex flex-col items-center gap-3.5 self-center'>
				<div>
					<Image
						src={user?.avatar_path || '/images/default-avatar.png'}
						alt='User avatar'
						width={110}
						height={110}
						className='rounded-full border-3 border-neutral-200 shadow-lg transition-all duration-300 hover:shadow-xl'
					/>
				</div>
				<div className='flex flex-col items-center'>
					<span className='text-xl font-semibold tracking-wider'>{user?.name}</span>
					<p className='text-sm opacity-85'>@{user?.nick}</p>
				</div>
				<p className='w-80 text-center opacity-60 dark:opacity-40'>{user?.description}</p>
				<div className='rounded-md border-2 border-neutral-100 bg-white px-4 py-1.5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800/90'>
					{user?.profession}
				</div>
			</div>
			<Button
				variant='ghost'
				className='w-full rounded-none hover:bg-none'
			>
				<hr className='w-full' />
				Open Full Chat
				<hr className='w-full' />
			</Button>
		</div>
	)
}

export default memo(ChatTop)
