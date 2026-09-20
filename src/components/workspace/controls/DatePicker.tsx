'use client'

import { addDays, format } from 'date-fns'
import { CalendarDays } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { MiniCalendar } from './MiniCalendar'
import { useAnchoredPopover } from './useAnchoredPopover'

export { MiniCalendar } from './MiniCalendar'

export function DatePicker({
	value,
	onChange,
	label = 'Date',
	min,
	max,
	optional = false
}: {
	value: string
	onChange: (v: string) => void
	label?: string
	min?: string
	max?: string
	optional?: boolean
}) {
	const [open, setOpen] = useState(false)
	const root = useRef<HTMLDivElement>(null)
	const trigger = useRef<HTMLButtonElement>(null)
	const panel = useRef<HTMLDivElement>(null)
	useAnchoredPopover(open, trigger, panel)
	useEffect(() => {
		if (!open) return
		const close = (e: PointerEvent) => {
			if (!root.current?.contains(e.target as Node)) setOpen(false)
		}
		document.addEventListener('pointerdown', close)
		return () => document.removeEventListener('pointerdown', close)
	}, [open])
	function select(v: string) {
		onChange(v)
		setOpen(false)
		trigger.current?.focus()
	}
	return (
		<div
			className='th-picker'
			ref={root}
			onKeyDown={e => {
				if (e.key === 'Escape' && open) {
					e.stopPropagation()
					setOpen(false)
					trigger.current?.focus()
				}
			}}
		>
			<button
				ref={trigger}
				type='button'
				className='th-control'
				aria-label={`${label}: ${value || 'Choose a date'}`}
				aria-expanded={open}
				onClick={() => setOpen(!open)}
			>
				<CalendarDays size={17} />
				<span>
					{value ? format(new Date(`${value}T12:00:00`), 'MMM d, yyyy') : 'Choose a date'}
				</span>
			</button>
			{open && (
				<div
					className='th-picker-panel'
					ref={panel}
					popover='auto'
					onToggle={event => {
						if ((event.nativeEvent as ToggleEvent).newState === 'closed') setOpen(false)
					}}
					role='group'
					aria-label={label}
				>
					<MiniCalendar value={value} onChange={select} min={min} max={max} />
					<div className='th-date-shortcuts'>
						{[0, 1, 7].map(n => {
							const date = format(addDays(new Date(), n), 'yyyy-MM-dd')
							return (
								<button
									key={n}
									type='button'
									disabled={!!((min && date < min) || (max && date > max))}
									onClick={() => select(date)}
								>
									{n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : '+1 week'}
								</button>
							)
						})}
						{optional && (
							<button type='button' onClick={() => select('')}>
								Clear
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
