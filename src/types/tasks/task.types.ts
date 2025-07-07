import type { LucideIcon } from 'lucide-react'
import { z } from 'zod'

import type { IProfile } from '@/types/profile.types'
import type { ISubTask } from '@/types/tasks/sub-tasks.types'
import type { TaskSchema } from '@/zod-schemes/task.zod'

export interface ITask extends Omit<ISubTask, 'isCompleted'> {
	users: IProfile[]
	icon: LucideIcon
	dueDate: Date
	comments: string[]
	resources: string[]
	links: string[]
	subTasks: ISubTask[]
}

export type TFilterTasks = 'all' | 'done' | 'in-progress' | 'upcoming'
export type TSortingTasks = 'none' | 'asc' | 'desc'
