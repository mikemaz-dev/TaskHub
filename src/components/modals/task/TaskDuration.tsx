'use client'

import { useWorkSchedule } from '@/components/workspace/availability/WorkScheduleProvider'
import { workHoursError, workIntervals, timeMinute, minuteTime } from '@/utils/work-hours'
import { HelpTip } from '@/components/workspace/HelpTip'
import { localNow } from '@/utils/task-schedule'
import { useTaskForm } from './useTaskForm'

export function TaskDuration({ form }: { form: ReturnType<typeof useTaskForm>['form'] }) {
	const schedule = useWorkSchedule()
	function useNow() {
		const now = localNow()
		const issue = workHoursError(now.date, now.time, null, schedule)
		if (issue) { form.setError(issue.field, { message: issue.message }); return }
		form.setValue('due_date', now.date, { shouldValidate: true })
		form.setValue('start_time', now.time, { shouldValidate: true })
		if (form.getValues('end_time') <= now.time) form.setValue('end_time', '')
	}
	function duration(minutes: number) {
		const now = localNow()
		const date = form.getValues('due_date') || now.date
		const chosen = form.getValues('start_time')
		const minimum = date === now.date ? timeMinute(now.time) : 0
		const interval = workIntervals(date, schedule).find(i => i.end > minimum)
		const start = chosen || (interval ? minuteTime(Math.max(interval.start, minimum)) : now.time)
		const [h, m] = start.split(':').map(Number)
		const end = h * 60 + m + minutes
		if (!Number.isFinite(end) || end >= 1440) {
			form.setError('end_time', { message: 'This duration crosses midnight. Choose a shorter duration or another day.' })
			return
		}
		const issue = workHoursError(date, start, minuteTime(end), schedule)
		if (issue) { form.setError(issue.field, { message: issue.message }); return }
		form.setValue('due_date', date, { shouldValidate: true })
		form.setValue('start_time', start, { shouldValidate: true })
		form.setValue('end_time', `${String(Math.floor(end / 60)).padStart(2, '0')}:${String(end % 60).padStart(2, '0')}`, { shouldValidate: true })
	}
	return (
		<div className='th-duration-presets'>
			<span>Duration <HelpTip topic='duration' /></span>
			<button type='button' onClick={useNow}>Now</button>
			{[30, 60, 90].map(minutes => (
				<button type='button' key={minutes} onClick={() => duration(minutes)}>+{minutes} min</button>
			))}
		</div>
	)
}
