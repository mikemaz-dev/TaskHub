'use client'

import { ChevronDown } from 'lucide-react'
import { AnimatePresence, m } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { memo } from 'react'

import { arrowAnimations, dropdownAnimations } from '@/components/animations/DropdownAnimations'

import { cn } from '@/utils/cn.util'

import type { IDropdownItem } from '@/types/dropdown/dropdown-item.types'

interface IDropdownButton {
	items: IDropdownItem[]
	onSelect?: (item: IDropdownItem) => void
	placeholder?: string
}

function DropdownButton({ placeholder, items, onSelect }: IDropdownButton) {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedItem, setSelectedItem] = useState<IDropdownItem | null>(null)
	const dropdownRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const handleItemClick = (item: IDropdownItem) => {
		setSelectedItem(item)
		setIsOpen(false)
		onSelect?.(item)
		item.onClick?.()
	}

	const displayText = selectedItem?.label || placeholder

	return (
		<div
			className='text-foreground relative select-none'
			ref={dropdownRef}
		>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					'border-secondary hover:bg-primary dark:hover:bg-primary flex cursor-pointer items-center gap-2 rounded-full border-2 bg-white px-3 py-1 transition-all duration-300 hover:border-transparent hover:text-white hover:shadow-sm dark:bg-neutral-800',
					isOpen && 'dark:bg-primary border-transparent bg-white shadow-sm dark:border-transparent'
				)}
				aria-haspopup={true}
				aria-expanded={isOpen}
				aria-label='Choose project chart display mode'
			>
				<span className='font-medium sm:text-sm'>{displayText}</span>

				<m.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={arrowAnimations.transition}
				>
					<ChevronDown
						size={20}
						className='dark:text-neutral-300'
					/>
				</m.div>
			</button>

			<AnimatePresence>
				{isOpen && (
					<m.div
						className='absolute top-full right-0 z-50 mt-2 w-full min-w-[200px] rounded-2xl border border-gray-200 bg-white shadow-lg sm:left-0 sm:min-w-[150px] dark:border-neutral-700 dark:bg-neutral-800'
						initial={dropdownAnimations.initial}
						animate={dropdownAnimations.animate}
						exit={dropdownAnimations.exit}
						transition={dropdownAnimations.transition}
						style={dropdownAnimations.style}
					>
						{items.map((item, index) => (
							<button
								key={index}
								onClick={() => handleItemClick(item)}
								className='hover:border-primary/85 hover:bg-primary/16 w-full cursor-pointer rounded-2xl border-2 border-transparent px-4 py-1.5 text-left text-lg font-medium transition-colors duration-300 md:text-base'
								aria-label={`Choose ${item.label}`}
							>
								{item.label}
							</button>
						))}
					</m.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default memo(DropdownButton)
