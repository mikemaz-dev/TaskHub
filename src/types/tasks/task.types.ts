import type { Database } from '@/types/db.types'

export type TSubTask = Database['public']['Tables']['sub_task']['Row'][]
export type TTask = Database['public']['Tables']['task']['Row'] & {
	sub_task: TSubTask
}

export type TFilterTasks = 'all' | 'done' | 'in-progress' | 'upcoming'
export type TSortingTasks = 'none' | 'asc' | 'desc'
