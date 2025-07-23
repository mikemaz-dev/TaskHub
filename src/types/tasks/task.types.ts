import { type getServerTasks, getServerTodayTasks } from '@/services/tasks/task-server.service'
import type { Database } from '@/types/db.types'

export type TTaskUpdate = Database['public']['Tables']['task']['Update']
export type TTaskCreate = Database['public']['Tables']['task']['Insert']
export type TSubTaskCreate = Database['public']['Tables']['sub_task']['Insert']

export type TGetTasksResponse = NonNullable<Awaited<ReturnType<typeof getServerTasks>>['data']>
export type TGetTodayTasksResponse = NonNullable<
	Awaited<ReturnType<typeof getServerTodayTasks>>
>['data']

export type TSubTask = Database['public']['Tables']['sub_task']['Row']
export type TTask = Database['public']['Tables']['task']['Row'] & {
	sub_task: TSubTask[]
	task_participants: TGetTasksResponse[0]['task_participants']
}

export type TFilterTasks = 'all' | 'done' | 'in-progress' | 'upcoming'
export type TSortingTasks = 'none' | 'asc' | 'desc'
