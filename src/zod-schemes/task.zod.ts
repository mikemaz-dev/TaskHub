import { z } from 'zod'

export const TaskSchema = z.object({
	title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
	due_date: z.string().refine(date => !isNaN(Date.parse(date)), {
		message: 'Invalid date format',
		path: ['due_date']
	}),
	start_time: z.string(),
	end_time: z.string(),
	icon: z.string().min(1, 'Icon is required'),
	project_id: z.string().min(1),
	participants: z.array(z.string().uuid()).optional()
})

export type TTaskFormData = z.infer<typeof TaskSchema>
