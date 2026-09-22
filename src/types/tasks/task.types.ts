import { IProject } from '../project/project.types'

import { type getServerTasks } from '@/services/tasks/task-server.service'
import type { Database } from '@/types/db.types'

export type TGetTasksResponse = NonNullable<Awaited<ReturnType<typeof getServerTasks>>['data']>

export type TTaskUpdate = Database['public']['Tables']['task']['Update'] & {
	participants?: string[]
}
export type TTaskCreate = Database['public']['Tables']['task']['Insert'] & {
	participants?: string[]
}
export type TSubTaskCreate = Database['public']['Tables']['sub_task']['Insert']

export type TSubTask = Database['public']['Tables']['sub_task']['Row']

export type TTask = Database['public']['Tables']['task']['Row'] & {
	sub_task: TSubTask[]
	project?: Pick<IProject, 'name' | 'color'> | null
	task_participants: TGetTasksResponse[0]['task_participants']
}

export type TTaskCalendar = {
	id: string
	title: string
	due_date: string
	start_time: string | null
	end_time: string | null
	project: Pick<IProject, 'name' | 'color'> | null
	sub_task: TSubTask[]
	task_participants: TGetTasksResponse[0]['task_participants']
}

export type TFilterTasks = 'all' | 'done' | 'in-progress' | 'upcoming'
export type TSortingTasks = 'asc' | 'desc'
