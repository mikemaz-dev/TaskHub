'use client'

import { ChevronDown } from 'lucide-react'
import { AnimatePresence, m } from 'motion/react'
import { memo, useEffect, useRef, useState } from 'react'

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

		if (typeof document !== 'undefined') {
			document.addEventListener('mousedown', handleClickOutside)
			return () => {
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}
	}, [])

	const handleItemClick = (item: IDropdownItem) => {
		setSelectedItem(item)
		setIsOpen(false)
		onSelect?.(item)
		item.onClick?.()
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			setIsOpen(false)
		} else if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			setIsOpen(!isOpen)
		}
	}

	const handleItemKeyDown = (e: React.KeyboardEvent, item: IDropdownItem) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			handleItemClick(item)
		}
	}

	const displayText = selectedItem?.label || placeholder

	return (
		<div
			className='text-foreground relative select-none'
			ref={dropdownRef}
			onKeyDown={handleKeyDown}
		>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					'border-secondary dark:hover:bg-secondary dark:bg-secondary/50 flex cursor-pointer items-center gap-2 rounded-full border-2 bg-white px-3 py-1 transition-all duration-300 hover:border-transparent hover:bg-violet-600/20 hover:text-white hover:shadow-sm',
					isOpen && 'dark:bg-primary border-transparent bg-white shadow-sm dark:border-transparent'
				)}
				aria-haspopup='listbox'
				aria-expanded={isOpen}
				aria-label={placeholder || 'Choose an option'}
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
						className='absolute top-full right-0 z-50 mt-2 w-full min-w-[200px] rounded-xl border border-gray-200 bg-white shadow-lg sm:left-0 sm:min-w-[150px] dark:border-neutral-700 dark:bg-neutral-800'
						initial={dropdownAnimations.initial}
						animate={dropdownAnimations.animate}
						exit={dropdownAnimations.exit}
						transition={dropdownAnimations.transition}
						style={dropdownAnimations.style}
						role='listbox'
						aria-label='Options'
					>
						<div className='flex flex-col gap-1'>
							{items.map((item, index) => (
								<button
									key={item.value || index}
									onClick={() => handleItemClick(item)}
									onKeyDown={e => handleItemKeyDown(e, item)}
									className='hover:border-primary/85 w-full cursor-pointer rounded-xl border-2 border-transparent px-3 py-1 text-left text-lg font-medium transition-colors duration-300 md:text-base'
									role='option'
									aria-selected={selectedItem?.value === item.value}
									aria-label={`Choose ${item.label}`}
								>
									{item.label}
								</button>
							))}
						</div>
					</m.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default memo(DropdownButton)
