import Link from 'next/link'

import type { IMenu, ISettingsMenu } from '@/components/layout/sidebar/menu/menu.type'

import { cn } from '@/utils/cn.util'

export function SidebarItem({
	item,
	isActive
}: {
	item: IMenu | ISettingsMenu
	isActive: boolean
}) {
	return (
		<li>
			<Link
				href={item.href}
				className={cn(
					'group/sidebar hover:bg-secondary base-round flex cursor-pointer items-center px-2.5 py-1.5 transition-colors duration-150 select-none dark:text-neutral-100',
					{
						'flex justify-between': item.name === 'Messages',
						'bg-primary/10 text-foreground pointer-events-none font-medium': isActive
					}
				)}
			>
				<div className='flex items-center gap-2'>
					<item.icon
						size={20}
						className={cn('opacity-75 group-hover/sidebar:opacity-90', isActive && 'opacity-95')}
					/>
					<span>{item.name}</span>
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
