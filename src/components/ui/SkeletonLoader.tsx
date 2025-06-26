import type { CSSProperties } from 'react'

import { cn } from '@/utils/cn.util'

interface Props {
	count?: number
	style?: CSSProperties
	className?: string
}

export function SkeletonLoader({ count = 1, className = '', style }: Props) {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<div
					key={index}
					className={cn(
						'bg-neutral-400 opacity-15 rounded-2xl h-10 mb-2.5 animate-pulse',
						className
					)}
					style={style}
				/>
			))}
		</>
	)
}
