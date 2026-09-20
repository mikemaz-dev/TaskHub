'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Clock3 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { TimePicker } from '../controls/TimePicker'
import { readSchedule } from './work-schedule'
import '@/styles/availability.css'

export function WorkingHours({ userId, value }: { userId: string; value: unknown }) {
	const initial = readSchedule(value)
	const [start, setStart] = useState(initial?.start || '09:00')
	const [end, setEnd] = useState(initial?.end || '18:00')
	const [timezone, setTimezone] = useState(initial?.timezone || 'UTC')
	const [days, setDays] = useState(initial?.days || [1, 2, 3, 4, 5])
	const [busy, setBusy] = useState(false)
	const [message, setMessage] = useState('')
	const [failed, setFailed] = useState(false)
	const router = useRouter()
	useEffect(() => {
		if (readSchedule(value)) return
		const frame = requestAnimationFrame(() => setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone))
		return () => cancelAnimationFrame(frame)
	}, [value])
	async function save(clear = false) {
		const schedule = clear ? null : readSchedule({ start, end, timezone, days })
		if (!clear && !schedule) { setFailed(true); setMessage('Choose valid times, a time zone and at least one working day.'); return }
		setBusy(true); setMessage(''); setFailed(false)
		try {
			const { data, error } = await createClient().from('profile').update({ work_schedule: schedule }).eq('id', userId).select('id').single()
			if (error || !data) throw error
			setMessage(clear ? 'Working hours hidden.' : 'Working hours saved. Your team can see them.')
			router.refresh()
		} catch { setFailed(true); setMessage('Could not save working hours. Please try again.'); }
		finally { setBusy(false) }
	}
	return <section className='th-panel th-card th-working-hours'>
		<h2><Clock3 size={18} />Your working hours</h2>
		<p>Let teammates know when to expect a reply. This does not restrict when you can use TaskHub.</p>
		<form onSubmit={e => { e.preventDefault(); void save() }}>
			<fieldset disabled={busy}>
				<div className='th-form-columns'>
					<div className='th-field'><span>From</span><TimePicker label='Work starts' value={start} onChange={setStart} /></div>
					<div className='th-field'><span>To</span><TimePicker label='Work ends' value={end} onChange={setEnd} /></div>
				</div>
				<label className='th-field'>Time zone<input list='work-timezones' value={timezone} onChange={e => setTimezone(e.target.value)} /></label>
				<datalist id='work-timezones'>{Intl.supportedValuesOf('timeZone').map(zone => <option key={zone} value={zone} />)}</datalist>
				<div className='th-work-days' role='group' aria-label='Working days'>
					{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label, i) => {
						const day = (i + 1) % 7
						return <button type='button' key={day} aria-pressed={days.includes(day)} onClick={() => setDays(days.includes(day) ? days.filter(d => d !== day) : [...days, day])}>{label}</button>
					})}
				</div>
				{start > end && <p className='th-small th-muted'>Overnight shift — ends the next day.</p>}
				<div className='th-state-actions'><button className='th-button'>{busy ? 'Saving…' : 'Save working hours'}</button><button type='button' className='th-text-link' onClick={() => void save(true)}>Hide hours</button></div>
			</fieldset>
		</form>
		{message && <p className={failed ? 'th-error' : 'th-small'} role='status'>{message}</p>}
	</section>
}
