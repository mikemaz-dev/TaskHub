'use client'

import { addDays, addMonths, format, isSameMonth, startOfMonth, startOfWeek } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export function MiniCalendar({
	value,
	onChange,
	min,
	max
}: {
	value: string
	onChange: (value: string) => void
	min?: string
	max?: string
}) {
	const selected = value ? new Date(`${value}T12:00:00`) : new Date()
	const [month, setMonth] = useState(startOfMonth(selected))
	const [previousValue, setPreviousValue] = useState(value)
	if (value !== previousValue) {
		setPreviousValue(value)
		if (value) setMonth(startOfMonth(new Date(`${value}T12:00:00`)))
	}
	const first = startOfWeek(startOfMonth(month), { weekStartsOn: 1 })
	const today = format(new Date(), 'yyyy-MM-dd')
	return (
		<div className='th-mini-calendar'>
			<div className='th-month-heading'>
				<strong aria-live='polite'>{format(month, 'MMMM yyyy')}</strong>
				<button
					type='button'
					aria-label='Previous month'
					onClick={() => setMonth(addMonths(month, -1))}
				>
					<ChevronLeft size={16} />
				</button>
				<button type='button' aria-label='Next month' onClick={() => setMonth(addMonths(month, 1))}>
					<ChevronRight size={16} />
				</button>
			</div>
			<div className='th-days-grid'>
				{['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
					<span key={d}>{d}</span>
				))}
				{Array.from({ length: 42 }, (_, i) => {
					const date = addDays(first, i),
						key = format(date, 'yyyy-MM-dd')
					return (
						<button
							key={key}
							type='button'
							disabled={!!((min && key < min) || (max && key > max))}
							aria-label={format(date, 'EEEE, MMMM d, yyyy')}
							aria-pressed={key === value}
							aria-current={key === today ? 'date' : undefined}
							className={`${isSameMonth(date, month) ? '' : 'is-outside'} ${key === value ? 'is-selected' : ''} ${key < today ? 'is-past' : ''}`}
							onClick={() => onChange(key)}
							onKeyDown={e => {
								const delta = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key]
								if (delta) {
									e.preventDefault()
									const next = addDays(date, delta)
									const label = format(next, 'EEEE, MMMM d, yyyy')
									const root = e.currentTarget.closest('.th-mini-calendar')
									if (!isSameMonth(next, month)) {
										setMonth(startOfMonth(next))
										requestAnimationFrame(() =>
											root
												?.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)
												?.focus()
										)
									} else
										root?.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)?.focus()
								}
							}}
						>
							{format(date, 'd')}
						</button>
					)
				})}
			</div>
		</div>
	)
}
