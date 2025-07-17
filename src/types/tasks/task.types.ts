import type { LucideIcon } from 'lucide-react'

import type { IProfile } from '@/types/profile.types'
import type { ISubTask } from '@/types/tasks/sub-tasks.types'

export interface ITask extends Omit<ISubTask, 'isCompleted'> {
	users: IProfile[]
	icon: LucideIcon
	due_date: Date
	start_time: Date
	end_time: Date
	comments: string[]
	resources: string[]
	links: string[]
	subTasks: ISubTask[]
}

export type TFilterTasks = 'all' | 'done' | 'in-progress' | 'upcoming'
export type TSortingTasks = 'none' | 'asc' | 'desc'
