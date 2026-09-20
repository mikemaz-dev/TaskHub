'use client'
import { Clock3 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { isWorking, readSchedule } from './work-schedule'
import '@/styles/availability.css'
export function WorkStatus({ value }: { value: unknown }) {
	const schedule = readSchedule(value)
	const [now, setNow] = useState<Date | null>(null)
	useEffect(() => {
		const timer = setInterval(() => setNow(new Date()), 30000)
		const frame = requestAnimationFrame(() => setNow(new Date()))
		return () => { clearInterval(timer); cancelAnimationFrame(frame) }
	}, [])
	if (!schedule) return <span className='th-work-status is-unset'><Clock3 size={12} />Hours not set</span>
	const working = now && isWorking(schedule, now)
	return <span className='th-work-status' data-working={!!working}>
		<span><i />{!now ? 'Working hours' : working ? 'Working now' : 'Outside working hours'}</span>
		<small>{schedule.start}–{schedule.end}{schedule.start > schedule.end ? ' (+1 day)' : ''} · {schedule.timezone}</small>
		<small>{[1, 2, 3, 4, 5, 6, 0].filter(day => schedule.days.includes(day)).map(day => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]).join(' · ')}</small>
	</span>
}
