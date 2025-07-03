'use client'

import { m } from 'motion/react'
import type { ComponentType } from 'react'

import { cn } from '@/utils/cn.util'

interface IIconItem {
	name: string
	Icon: ComponentType<any>
}

interface IIconGrid {
	icons: IIconItem[]
	selectedIcon?: string
	onIconSelect: (iconName: string) => void
	searchTerm: string
}

export function IconSelectorGrid({ icons, selectedIcon, onIconSelect, searchTerm }: IIconGrid) {
	if (icons.length === 0) {
		return (
			<div className='py-8 text-center text-gray-500 dark:text-neutral-400'>
				No icons found for "{searchTerm}"
			</div>
		)
	}

	return (
		<div className='grid grid-cols-8 gap-2 sm:grid-cols-5 md:grid-cols-6'>
			{icons.map(({ name, Icon }, index) => (
				<m.button
					key={name}
					type='button'
					onClick={() => onIconSelect(name)}
					className={cn(
						'group flex cursor-pointer items-center justify-center rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-neutral-700',
						selectedIcon === name && 'bg-primary/10 text-primary'
					)}
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: index * 0.01, duration: 0.2 }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					title={name}
				>
					<Icon
						size={20}
						className='group-hover:text-primary transition-colors'
					/>
				</m.button>
			))}
		</div>
	)
}
