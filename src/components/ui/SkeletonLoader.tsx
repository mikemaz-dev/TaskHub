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
						'mb-2.5 h-10 animate-pulse rounded-2xl bg-neutral-400 opacity-15',
						className
					)}
					style={style}
				/>
			))}
		</>
	)
}
