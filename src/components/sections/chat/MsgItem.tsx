import Image from 'next/image'

import { cn } from '@/utils/cn.util'

import type { IMessage } from '@/types/message/message.interface'
import type { IProfile } from '@/types/profile.types'

export function MsgItem({ msg, user }: { msg: IMessage; user: IProfile }) {
	return (
		<div className={cn('flex', (msg.sender && 'justify-end') || 'justify-start')}>
			<div className='flex gap-2.5'>
				{!msg.sender && (
					<div className='bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full'>
						<Image
							src={user.avatar}
							alt='User avatar'
							width={40}
							height={40}
							className='rounded-full'
						/>
					</div>
				)}
				<div
					className={cn(
						'w-full max-w-[15rem] rounded-2xl px-4 py-2 text-sm',
						msg.sender
							? 'bg-primary text-primary-foreground ml-auto rounded-br-sm'
							: 'bg-muted mr-auto rounded-bl-sm'
					)}
				>
					{!msg.sender && <span className='text-primary font-semibold'>{msg.nickname}</span>}
					<p className='my-1'>{msg.text}</p>
					<div className='text-right text-xs opacity-60'>{msg.timestamp}</div>
				</div>
			</div>
		</div>
	)
}
