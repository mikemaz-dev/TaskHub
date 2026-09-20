'use client'

export function CalendarPeriod({
	period,
	setPeriod
}: {
	period: number
	setPeriod: (v: number) => void
}) {
	return (
		<div className='th-period-options'>
			{[0, 8, 16].map(n => (
				<button key={n} aria-pressed={period === n} onClick={() => setPeriod(n)}>
					{String(n).padStart(2, '0')}:00–
					{n === 16 ? '24' : String(n + 8).padStart(2, '0')}:00
				</button>
			))}
		</div>
	)
}
