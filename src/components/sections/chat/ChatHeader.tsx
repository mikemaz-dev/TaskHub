import { EllipsisVertical, MessageCircleMore, Phone, Video } from 'lucide-react'

import { Button } from '@/components/ui'

export function ChatHeader() {
	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-2'>
				<MessageCircleMore size={20} />
				<span className='font-semibold'>Chat</span>
			</div>

			<div className='flex items-center gap-1'>
				<Button
					variant='ghost'
					size='sm'
				>
					<Video
						color='transparent'
						className='size-5.5 fill-neutral-700 text-sm dark:fill-white'
					/>
				</Button>
				<Button
					variant='ghost'
					size='sm'
				>
					<Phone
						color='transparent'
						className='size-4 fill-neutral-700 dark:fill-white'
					/>
				</Button>
				<Button
					variant='ghost'
					size='sm'
				>
					<EllipsisVertical className='size-5.5' />
				</Button>
			</div>
		</div>
	)
}
