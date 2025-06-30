import { Link2, Image as LucideImage, MessageSquareText } from 'lucide-react'

import type { ITask } from '@/types/tasks/task.types'

export function TaskItemStats({ task }: { task: ITask }) {
	return (
		<div className='flex items-center gap-4'>
			<div className='flex items-center justify-center gap-1'>
				<MessageSquareText
					size={16}
					className='opacity-40'
				/>
				<span className='text-sm font-semibold'>{task.comments.length}</span>
			</div>
			<div className='flex items-center justify-center gap-1'>
				<LucideImage
					size={16}
					className='opacity-40'
				/>
				<span className='text-sm font-semibold'>{task.resources.length}</span>
			</div>
			<div className='flex items-center gap-1'>
				<Link2
					size={16}
					className='opacity-40'
				/>
				<span className='text-sm font-semibold'>{task.links.length}</span>
			</div>
		</div>
	)
}
