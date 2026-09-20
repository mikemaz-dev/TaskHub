'use client'

import { CalendarDays, ListTodo } from 'lucide-react'

export function TaskEditorTabs({
	tab,
	setTab
}: {
	tab: 'details' | 'checklist'
	setTab: (v: 'details' | 'checklist') => void
}) {
	return (
		<div className='th-editor-tabs'>
			<button type='button' aria-pressed={tab === 'details'} onClick={() => setTab('details')}>
				<CalendarDays size={15} />
				Details
			</button>
			<button type='button' aria-pressed={tab === 'checklist'} onClick={() => setTab('checklist')}>
				<ListTodo size={15} />
				Checklist
			</button>
		</div>
	)
}
