'use client'

import { ChevronDown } from 'lucide-react'
import { memo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

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

	const handleItemClick = (item: IDropdownItem) => {
		setSelectedItem(item)
		setIsOpen(false)
		onSelect?.(item)
		item.onClick?.()
	}

	const displayText = selectedItem?.label || placeholder

	return (
		<div
			className='relative max-w-xs select-none'
			ref={dropdownRef}
		>
			<button
				type='button'
				onClick={() => setIsOpen(prev => !prev)}
				onMouseDown={e => e.preventDefault()}
				className={cn(
					'border-border text-foreground base-round flex w-max items-center justify-between gap-2 border px-3 py-2 text-sm font-medium shadow-sm transition-colors',
					isOpen && 'border-primary/60 dark:border-primary/60'
				)}
				aria-haspopup='listbox'
				aria-expanded={isOpen}
				aria-label={placeholder || 'Choose an option'}
			>
				<span>{displayText}</span>
				<ChevronDown
					size={18}
					className={cn('transition-transform', isOpen && 'rotate-180')}
				/>
			</button>

			{isOpen &&
				createPortal(
					<>
						<div
							className='fixed inset-0 z-40'
							onClick={() => setIsOpen(false)}
							tabIndex={-1}
						/>

						<div
							className='base-round border-border bg-background mt-2 absolute z-50 border shadow-lg'
							role='listbox'
							style={{
								top: dropdownRef.current?.getBoundingClientRect().bottom ?? 0,
								left: dropdownRef.current?.getBoundingClientRect().left ?? 0,
								width: dropdownRef.current?.getBoundingClientRect().width ?? 'auto'
							}}
						>
							{items.map((item, index) => (
								<button
									key={item.value || index}
									type='button'
									onClick={() => handleItemClick(item)}
									className='text-foreground hover:bg-secondary w-full px-3 py-1.5 text-left'
									role='option'
									aria-selected={selectedItem?.value === item.value}
								>
									{item.label}
								</button>
							))}
						</div>
					</>,
					document.body
				)}
		</div>
	)
}

export default memo(DropdownButton)
