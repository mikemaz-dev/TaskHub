'use client'

import { AnimatePresence, m } from 'motion/react'
import type { ComponentType } from 'react'

import { Button } from '@/components/ui'
import { IconSelectorGrid, IconSelectorSearch } from '@/components/ui/IconSelector'

interface IIconItem {
	name: string
	Icon: ComponentType<any>
}

interface IIconSelectorDropdown {
	isOpen: boolean
	onClose: () => void
	icons: IIconItem[]
	selectedIcon?: string
	onIconSelect: (iconName: string) => void
	searchTerm: string
	onSearchChange: (term: string) => void
}

export function IconSelectorDropdown({
	isOpen,
	onClose,
	icons,
	selectedIcon,
	onIconSelect,
	searchTerm,
	onSearchChange
}: IIconSelectorDropdown) {
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<m.div
						className='fixed inset-0 z-40 bg-black/20'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
					/>

					<m.div
						className='absolute top-full right-0 left-0 z-50 mt-2 max-h-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-neutral-600 dark:bg-neutral-800'
						initial={{ opacity: 0, scale: 0.95, y: -10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -10 }}
						transition={{ type: 'spring', stiffness: 400, damping: 25 }}
					>
						<IconSelectorSearch
							searchTerm={searchTerm}
							onSearchChange={onSearchChange}
						/>

						<div className='max-h-80 overflow-y-auto p-3'>
							<IconSelectorGrid
								icons={icons}
								selectedIcon={selectedIcon}
								onIconSelect={onIconSelect}
								searchTerm={searchTerm}
							/>
						</div>

						<div className='border-t border-gray-200 bg-gray-50 p-3 dark:border-neutral-600 dark:bg-neutral-700/50'>
							<div className='flex items-center justify-between text-sm text-gray-500 dark:text-neutral-400'>
								<span>{icons.length} icons</span>
								<Button
									variant='secondary'
									onClick={onClose}
								>
									Close
								</Button>
							</div>
						</div>
					</m.div>
				</>
			)}
		</AnimatePresence>
	)
}
