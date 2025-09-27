'use client'

import { Calendar, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { localizer } from '@/lib/localizer'
import { TTaskCalendar } from '@/types/tasks/task.types'

interface Props {
  tasks: TTaskCalendar[]
}

export function CalendarView({ tasks }: Props) {
  const events = (tasks ?? []).map(task => {
    const start = new Date(`${task.due_date}T${task.start_time ?? '00:00:00'}`)
    const end = new Date(`${task.due_date}T${task.end_time ?? task.start_time ?? '00:00:00'}`)

    return {
      ...task,
      start,
      end,
      title: task.title,
    }
  })

  return (
    <div style={{ height: '600px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        titleAccessor='title'
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultView={Views.MONTH}
        style={{ height: '100%' }}
        popup
      />
    </div>
  )
}
