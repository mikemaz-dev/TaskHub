import type { ReactNode } from 'react'

import { cn } from '@/utils/cn.util'

interface SidebarTopicProps {
	title: string
	children: ReactNode
	className?: string
}

export function SidebarTopic({ title, children, className }: SidebarTopicProps) {
	return (
		<div className={cn('flex flex-col gap-2.5', className)}>
			<span className='dark:tex-white font-medium opacity-60'>{title}</span>
			{children}
		</div>
	)
}
