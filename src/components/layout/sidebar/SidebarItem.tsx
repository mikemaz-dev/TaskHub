import Link from 'next/link'

import type { IMenu } from '@/components/layout/sidebar/menu/menu.type'

import { cn } from '@/utils/cn.util'

export function SidebarItem({ item, isActive }: { item: IMenu; isActive: boolean }) {
	return (
		<li>
			<Link
				href={item.href}
				className={cn(
					'flex items-center rounded-2xl p-2.5 text-gray-500 dark:text-neutral-100 cursor-pointer select-none group  transition-colors duration-200',
					{
						'flex justify-between': item.name === 'Messages',
						'bg-primary text-white pointer-events-none': isActive
					}
				)}
			>
				<div className='flex items-center gap-2'>
					<item.icon
						size={21}
						absoluteStrokeWidth={true}
						className='group-hover:text-primary opacity-90 transition-colors'
					/>
					<span className='font-medium  group-hover:text-primary transition-colors'>
						{item.name}
					</span>
				</div>
				{item.name === 'Messages' && (
					<span className='bg-purple-300 text-purple-600 text-sm font-medium px-2.5 rounded-full'>
						4
					</span>
				)}
			</Link>
		</li>
	)
}
