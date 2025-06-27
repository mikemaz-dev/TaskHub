import type { LucideIcon } from 'lucide-react'

import type { IProfile } from '@/types/profile.types'
import type { ISubTask } from '@/types/tasks/sub-tasks.types'

export interface ITask extends Omit<ISubTask, 'isCompleted'> {
	users: IProfile[]
	icon: LucideIcon
	dueDate: Date
	comments: string[]
	resources: string[]
	links: string[]
	subTasks: ISubTask[]
}
