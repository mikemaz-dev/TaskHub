'use client'

import { ArrowDown, ArrowUp, LocateFixed } from 'lucide-react'
import { type RefObject, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useCalendarClock } from './useCalendarClock'
import '@/styles/calendar-now.css'

type Position = { top: number; left: number; width: number; direction: 'up' | 'down' | 'visible' }
export function CalendarNow({ scroll, date, columns, choose }: {
	scroll: RefObject<HTMLDivElement | null>
	date: string
	columns: number
	choose: (date: string) => void
}) {
	const now = useCalendarClock()
	const [position, setPosition] = useState<Position | null>(null)
	const pending = useRef(false)
	useEffect(() => {
		const root = scroll.current
		if (!root) return
		let frame = 0
		function measure() {
			if (!root) return
			const [hour, minute] = now.time.split(':').map(Number)
			const cell = root.querySelector<HTMLElement>(`[data-slot-date="${now.date}"][data-slot-hour="${hour}"]`)
			if (!cell) { setPosition(null); return }
			const rect = cell.getBoundingClientRect(), bounds = root.getBoundingClientRect()
			const top = rect.top - bounds.top + root.scrollTop + rect.height * minute / 60
			if (pending.current) {
				pending.current = false
				root.scrollTo({ top: Math.max(0, top - root.clientHeight / 2) })
			}
			const row = root.querySelectorAll<HTMLElement>(`[data-slot-hour="${hour}"]`)
			const first = row[0].getBoundingClientRect()
			const last = row[row.length - 1].getBoundingClientRect()
			setPosition({ top, left: first.left - bounds.left + root.scrollLeft, width: last.right - first.left,
				direction: top < root.scrollTop + 18 ? 'up' : top > root.scrollTop + root.clientHeight - 18 ? 'down' : 'visible' })
		}
		const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure) }
		const resize = new ResizeObserver(schedule)
		resize.observe(root)
		root.addEventListener('scroll', schedule, { passive: true })
		schedule()
		return () => { cancelAnimationFrame(frame); resize.disconnect(); root.removeEventListener('scroll', schedule) }
	}, [scroll, date, columns, now.date, now.time])
	function locate() {
		if (position && scroll.current) {
			scroll.current.scrollTo({ top: Math.max(0, position.top - scroll.current.clientHeight / 2), behavior: 'smooth' })
		} else {
			pending.current = true
			choose(now.date)
		}
	}
	const Icon = position?.direction === 'up' ? ArrowUp : position?.direction === 'down' ? ArrowDown : LocateFixed
	return <>
		<button type='button' className='th-now-button' onClick={locate} title='Go to the current time today'>
			<i /><span>Now <time>{now.time}</time></span><Icon size={14} />
		</button>
		{position && scroll.current && createPortal(
			<div className='th-now-line' style={{ top: position.top, left: position.left, width: position.width }} aria-hidden='true'>
				<i /><span>{now.time}</span>
			</div>, scroll.current
		)}
	</>
}
