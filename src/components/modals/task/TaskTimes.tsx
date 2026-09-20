'use client'

import { useWorkSchedule } from '@/components/workspace/availability/WorkScheduleProvider'
import { workIntervals, minuteTime, timeMinute } from '@/utils/work-hours'
import { localNow } from '@/utils/task-schedule'
import { TimePicker } from '@/components/workspace/controls/TimePicker'

import { useTaskForm } from './useTaskForm'

export function TaskTimes({ form, creating }: { form: ReturnType<typeof useTaskForm>['form']; creating: boolean }) {
	const schedule = useWorkSchedule()
	const date = form.watch('due_date')
	const intervals = date ? workIntervals(date, schedule) : []
	const start = timeMinute(form.watch('start_time'))
	const interval = intervals.find(i => start >= i.start && start < i.end) || intervals[0]
	const lower = creating && date === localNow().date ? timeMinute(localNow().time) : 0
	const min = interval ? minuteTime(Math.max(lower, interval.start)) : undefined
	const max = interval ? minuteTime(Math.min(interval.end - 1, 1439)) : undefined
	return (
		<div className='th-form-columns'>
			<div className='th-field'>
				<span>
					Start time <small>Optional</small>
				</span>
				<TimePicker
					label='Start time'
					max={max}
					min={min}
					value={form.watch('start_time')}
					onChange={v => form.setValue('start_time', v)}
				/>
			</div>
			<div className='th-field'>
				<span>
					End time <small>Optional</small>
				</span>
				<TimePicker
					label='End time'
					max={interval ? minuteTime(Math.min(interval.end, 1439)) : undefined}
					min={min}
					value={form.watch('end_time')}
					onChange={v => form.setValue('end_time', v)}
				/>
			</div>
		</div>
	)
}
