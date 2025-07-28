import Link from 'next/link'

import type { IMenu } from '@/components/layout/sidebar/menu/menu.type'

import { cn } from '@/utils/cn.util'

export function SidebarItem({ item, isActive }: { item: IMenu; isActive: boolean }) {
	return (
		<li>
			<Link
				href={item.href}
				className={cn(
					'group flex cursor-pointer items-center rounded-2xl p-2.5 text-neutral-500 transition-colors duration-200 select-none dark:text-neutral-100',
					{
						'flex justify-between': item.name === 'Messages',
						'bg-primary pointer-events-none text-white': isActive
					}
				)}
			>
				<div className='flex items-center gap-2'>
					<item.icon
						size={21}
						className='group-hover:text-primary opacity-90 transition-colors'
					/>
					<span className='group-hover:text-primary font-medium transition-colors'>
						{item.name}
					</span>
				</div>
				{item.name === 'Messages' && (
					<span className='rounded-full bg-purple-300 px-2.5 text-sm font-medium text-purple-600'>
						4
					</span>
				)}
			</Link>
		</li>
	)
}
