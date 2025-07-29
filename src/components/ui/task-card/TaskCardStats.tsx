import { Link2, Image as LucideImage, MessageSquareText } from 'lucide-react'
import { memo } from 'react'

function TaskCardStats() {
	return (
		<div className='flex items-center gap-4'>
			<div className='flex items-center justify-center gap-1'>
				<MessageSquareText
					size={16}
					className='opacity-40'
				/>
				<span className='text-sm font-semibold'>2</span>
			</div>
			<div className='flex items-center justify-center gap-1'>
				<LucideImage
					size={16}
					className='opacity-40'
				/>
				<span className='text-sm font-semibold'>4</span>
			</div>
			<div className='flex items-center gap-1'>
				<Link2
					size={16}
					className='-rotate-45 opacity-40'
				/>
				<span className='text-sm font-semibold'>6</span>
			</div>
		</div>
	)
}

export default memo(TaskCardStats)
