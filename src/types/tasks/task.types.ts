import { Event } from 'react-big-calendar'

import { IProject } from '../project/project.types'

import { type getServerTasks } from '@/services/tasks/task-server.service'
import type { Database } from '@/types/db.types'

export type TGetTasksResponse = NonNullable<Awaited<ReturnType<typeof getServerTasks>>['data']>

export type TTaskUpdate = Database['public']['Tables']['task']['Update']
export type TTaskCreate = Database['public']['Tables']['task']['Insert']
export type TSubTaskCreate = Database['public']['Tables']['sub_task']['Insert']

export type TSubTask = Database['public']['Tables']['sub_task']['Row']

export type TTask = Database['public']['Tables']['task']['Row'] & {
	sub_task: TSubTask[]
	project: IProject
	task_participants: TGetTasksResponse[0]['task_participants']
}

export type TTaskCalendar = {
	id: string
	title: string
	due_date: Date
	start_time: Date
	end_time: Date
	project: IProject | null
	sub_task: TSubTask[]
	task_participants: TGetTasksResponse[0]['task_participants']
}

export type TFilterTasks = 'all' | 'done' | 'in-progress' | 'upcoming'
export type TSortingTasks = 'asc' | 'desc'
