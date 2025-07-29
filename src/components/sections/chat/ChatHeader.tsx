import { EllipsisVertical, MessageCircleMore, Phone, Video } from 'lucide-react'
import { memo } from 'react'

import { Button } from '@/components/ui'

function ChatHeader() {
	return (
		<div className='text-foreground flex items-center justify-between'>
			<div className='flex items-center gap-2'>
				<MessageCircleMore size={20} />
				<span className='font-semibold'>Chat</span>
			</div>

			<div className='flex items-center gap-1'>
				<Button
					variant='ghost'
					size='sm'
					aria-label='Call people via video'
				>
					<Video
						color='transparent'
						className='size-5.5 fill-neutral-700 text-sm dark:fill-white'
					/>
				</Button>
				<Button
					variant='ghost'
					size='sm'
					aria-label='Call people via phone'
				>
					<Phone
						color='transparent'
						className='size-4 fill-neutral-700 dark:fill-white'
					/>
				</Button>
				<Button
					variant='ghost'
					size='sm'
					aria-label='More chat options'
				>
					<EllipsisVertical className='size-5.5' />
				</Button>
			</div>
		</div>
	)
}

export default memo(ChatHeader)
