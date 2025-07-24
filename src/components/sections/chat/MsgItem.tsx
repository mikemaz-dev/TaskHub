import { format } from 'date-fns'
import Image from 'next/image'

import { cn } from '@/utils/cn.util'

import type { TChatMessageWithProfile } from '@/types/message/message.interface'

export function MsgItem({ msg, userId }: { msg: TChatMessageWithProfile; userId: string }) {
	const isOwnMessage = msg.user_id === userId

	return (
		<div className={cn('flex', (isOwnMessage && 'justify-end') || 'justify-start')}>
			<div className='flex gap-2.5'>
				{!isOwnMessage && (
					<div className='bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full'>
						<Image
							src={msg.profile?.avatar_path || '/images/default-avatar.png'}
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
						isOwnMessage
							? 'bg-primary text-primary-foreground ml-auto rounded-br-sm'
							: 'bg-muted mr-auto rounded-bl-sm'
					)}
				>
					{!isOwnMessage && <span className='text-primary font-semibold'>{msg.profile?.nick}</span>}
					<p className='my-1'>{msg.text}</p>
					<div className='text-right text-xs opacity-60'>
						{format(msg.created_at as string, 'h:mm aaa')}
					</div>
				</div>
			</div>
		</div>
	)
}
