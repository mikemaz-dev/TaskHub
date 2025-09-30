'use client'

import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

import { cn } from '@/utils/cn.util'

interface SidebarTopicProps {
	title: string
	children: ReactNode
	rightSide?: ReactNode
	link?: string
	className?: string
}

export function SidebarTopic({ title, children, rightSide, link, className }: SidebarTopicProps) {
	const router = useRouter()

	return (
		<div
			className={cn('group flex flex-col gap-2', className)}
			onClick={() => link && router.push(link)}
		>
			<div className='flex items-center justify-between'>
				<span className={cn('text-foreground opacity-60', link && 'hover:underline cursor-pointer')}>{title}</span>
				{rightSide}
			</div>
			{children}
		</div>
	)
}
