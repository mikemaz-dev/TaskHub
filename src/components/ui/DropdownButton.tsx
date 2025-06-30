'use client'

import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/utils/cn.util'

import type { IDropdownItem } from '@/types/dropdown/dropdown-item.types'

interface IDropdownButton {
	items: IDropdownItem[]
	onSelect?: (item: IDropdownItem) => void
	placeholder?: string
}

export function DropdownButton({ placeholder, items, onSelect }: IDropdownButton) {
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
			className='relative inline-block'
			ref={dropdownRef}
		>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center gap-2 border-2 border-gray-200 dark:border-neutral-600 px-3 py-1 cursor-pointer hover:border-transparent hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all duration-300 rounded-full'
				aria-haspopup={true}
				aria-expanded={isOpen}
			>
				<span className='font-medium text-lg md:text-sm transition-colors duration-300'>
					{displayText}
				</span>
				<ChevronDown
					size={20}
					className={cn(
						'text-gray-600 dark:text-neutral-300 transition-transform duration-300',
						isOpen && 'rotate-180'
					)}
				/>
			</button>
			{isOpen && (
				<div className='absolute top-full right-0 mt-2 w-full min-w-[200px] flex flex-col gap-0.5 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-600 rounded-lg shadow-lg z-50'>
					{items.map((item, index) => (
						<button
							key={index}
							onClick={() => handleItemClick(item)}
							className='w-full text-left text-lg md:normal-case px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg'
						>
							{item.label}
						</button>
					))}
				</div>
			)}
		</div>
	)
}
