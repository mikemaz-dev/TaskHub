'use client'

import { format } from 'date-fns'
import { Download } from 'lucide-react'

import { DatePicker } from './controls/DatePicker'

export function ReportToolbar({
	from,
	to,
	setFrom,
	setTo,
	exportCSV
}: {
	from: string
	to: string
	setFrom: (v: string) => void
	setTo: (v: string) => void
	exportCSV: () => void
}) {
	return (
		<div className='th-report-toolbar'>
			<div className='th-date-range'>
				<label>
					From
					<time className='th-print-date' dateTime={from}>{from ? format(new Date(`${from}T12:00:00`), 'MMM d, yyyy') : '—'}</time>
					<DatePicker value={from} max={to} onChange={setFrom} label='Report start date' />
				</label>
				<label>
					To
					<time className='th-print-date' dateTime={to}>{to ? format(new Date(`${to}T12:00:00`), 'MMM d, yyyy') : '—'}</time>
					<DatePicker value={to} min={from} onChange={setTo} label='Report end date' />
				</label>
			</div>
			<div className='th-header-actions'>
				<button className='th-button th-button-subtle' onClick={() => window.print()}>
					Print / save PDF
				</button>
				<button className='th-button' onClick={exportCSV} disabled={from > to || !from || !to}>
					<Download size={16} />
					Export CSV
				</button>
			</div>
		</div>
	)
}
