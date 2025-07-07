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
				'group ml-3 flex cursor-pointer items-center justify-between select-none',
				className
			)}
		>
			<div className='flex items-center gap-2'>
				<div className={cn('h-4 w-4 rounded-xs', color, className)} />
				<span
					className={cn(
						'font-medium text-gray-500 dark:text-neutral-200',
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
