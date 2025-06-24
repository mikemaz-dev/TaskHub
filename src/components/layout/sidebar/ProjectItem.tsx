import { SquareArrowOutUpRight } from 'lucide-react'

import { cn } from '@/utils/cn.util'

interface ProjectItemProps {
	name: string
	color: string
	className?: string
}

export function ProjectItem({ name, color, className }: ProjectItemProps) {
	return (
		<li
			className={cn(
				'flex items-center justify-between ml-3 cursor-pointer select-none group',
				className
			)}
		>
			<div className='flex items-center gap-2'>
				<div className={cn('w-4 h-4 rounded-sm', color, className)} />
				<span
					className={cn(
						'text-gray-500 dark:text-neutral-200 font-medium',
						'group-hover:text-gray-700 dark:group-hover:text-white',
						'transition-all duration-200'
					)}
				>
					{name}
				</span>
			</div>
			<button
				className={cn(
					'cursor-pointer opacity-0 group-hover:opacity-100',
					'transition-opacity duration-200'
				)}
			>
				<SquareArrowOutUpRight
					size={17}
					className='text-gray-500 dark:text-neutral-500'
					absoluteStrokeWidth={true}
				/>
			</button>
		</li>
	)
}
