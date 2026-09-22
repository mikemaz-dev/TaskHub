'use client'

import { Clock3 } from 'lucide-react'

export function TimePicker({
	value,
	onChange,
	label,
	min,
	max
}: {
	value: string
	onChange: (v: string) => void
	label: string
	max?: string
	min?: string
}) {
	return (
		<div className='th-time-control'>
			<Clock3 size={16} />
			<input
				aria-label={label}
				inputMode='numeric'
				placeholder={min || 'HH:mm'}
				onBlur={() => {
					if (!/^\d{2}:\d{2}$/.test(value)) return
					if (min && value < min) onChange(min)
					else if (max && value > max) onChange(max)
				}}
				maxLength={5}
				value={value.slice(0, 5)}
				onChange={e => {
					const raw = e.target.value.replace(/[^0-9:]/g, '')
					onChange(
						raw.length === 4 && !raw.includes(':') ? `${raw.slice(0, 2)}:${raw.slice(2)}` : raw
					)
				}}
				pattern='([01][0-9]|2[0-3]):[0-5][0-9]'
				title='Use 24-hour time, for example 09:30'
			/>
			<span>24h</span>
		</div>
	)
}
