'use client'

import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { useAnchoredPopover } from './useAnchoredPopover'

export function Select({
	value,
	onChange,
	options,
	label,
	placeholder = 'Select an option'
}: {
	value: string
	onChange: (v: string) => void
	options: { value: string; label: string }[]
	label: string
	placeholder?: string
}) {
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const trigger = useRef<HTMLButtonElement>(null)
	const panel = useRef<HTMLDivElement>(null)
	useAnchoredPopover(open, trigger, panel, true)
	useEffect(() => {
		if (!open) return
		const close = (e: PointerEvent) => {
			if (!ref.current?.contains(e.target as Node)) setOpen(false)
		}
		document.addEventListener('pointerdown', close)
		return () => document.removeEventListener('pointerdown', close)
	}, [open])
	return (
		<div
			className='th-picker'
			ref={ref}
			onKeyDown={e => {
				if (e.key === 'Escape' && open) {
					e.stopPropagation()
					setOpen(false)
					ref.current?.querySelector('button')?.focus()
				}
			}}
		>
			<button
				type='button'
				className='th-control'
				ref={trigger}
				aria-label={label}
				aria-expanded={open}
				onClick={() => setOpen(!open)}
			>
				<span>{options.find(o => o.value === value)?.label || placeholder}</span>
				<ChevronDown size={16} />
			</button>
			{open && (
				<div
					className='th-option-list'
					ref={panel}
					popover='auto'
					onToggle={event => {
						if ((event.nativeEvent as ToggleEvent).newState === 'closed') setOpen(false)
					}}
					role='group'
					aria-label={label}
				>
					{options.length ? (
						options.map(o => (
							<button
								type='button'
								aria-pressed={value === o.value}
								key={o.value}
								onClick={() => {
									onChange(o.value)
									setOpen(false)
									ref.current?.querySelector('button')?.focus()
								}}
							>
								{o.label}
								{o.value === value && <Check size={15} />}
							</button>
						))
					) : (
						<p>No options available</p>
					)}
				</div>
			)}
		</div>
	)
}
