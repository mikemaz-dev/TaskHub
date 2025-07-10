import { z } from 'zod'

import { SubtaskSchema } from '@/zod-schemes/sub-task.zod'

export interface ISubTask {
	id: number
	title: string
	isCompleted: boolean
}
