'use client'

import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'

import { Pages } from '@/config/public-page.config'

import { cn } from '@/utils/cn.util'

interface ProjectItemProps {
	name: string
	slug: string
	color: string
	className?: string
}

export function ProjectItem({ name, slug, color, className }: ProjectItemProps) {
	const pathName = usePathname()
	const matcher = match(Pages.PROJECTS + slug)
	const isActive = pathName ? !!matcher(pathName) : false

	return (
		<li
			className={cn(
				'group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 select-none',
				className,
				isActive && 'bg-neutral-900'
			)}
		>
			<Link
				href={`${Pages.DASHBOARD}/projects/${slug}`}
				className='flex w-full items-center justify-between'
			>
				<div className='flex items-center gap-2'>
					<div
						className='h-4 w-4 rounded-xs'
						style={{ backgroundColor: color }}
					/>
					<span
						className={cn(
							'font-medium text-gray-500 dark:text-neutral-200',
							'group-hover:text-gray-700 dark:group-hover:text-white',
							'transition-all duration-200',
							isActive && 'group-hover:text-neutral-200'
						)}
					>
						{name}
					</span>
				</div>
				<SquareArrowOutUpRight
					size={17}
					className={cn(
						'text-gray-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:text-neutral-500',
						isActive && 'opacity-100'
					)}
					absoluteStrokeWidth={true}
				/>
			</Link>
		</li>
	)
}
