import { z } from 'zod'

export const TaskSchema = z.object({
	title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
	dueDate: z.date().min(new Date(), 'Due Date is required'),
	icon: z.string().min(1, 'Icon is required')
})

export type TTaskFormData = z.infer<typeof TaskSchema>
