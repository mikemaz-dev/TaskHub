import Link from 'next/link'
import type { ReactNode } from 'react'

import { cn } from '@/utils/cn.util'

export function SidebarItem({ icon, name, href }: { icon: ReactNode; name: string; href: string }) {
	return (
		<li>
			<Link
				href={href}
				className={cn(
					'flex items-center rounded-2xl p-2.5 cursor-pointer select-none text-gray-500 dark:text-gray-200 hover:bg-primary dark:hover:bg-blue-600 hover:text-white transition-colors duration-200',
					name === 'Messages' && 'flex justify-between'
				)}
			>
				<div className='flex items-center gap-2'>
					{icon}
					<span className='font-medium'>{name}</span>
				</div>
				{name === 'Messages' && (
					<span className='bg-purple-300 text-purple-600 text-sm font-medium px-2.5 rounded-full'>
						4
					</span>
				)}
			</Link>
		</li>
	)
}
