import type { LucideIcon } from 'lucide-react'
import { z } from 'zod'

export const TaskSchema = z.object({
	title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
	dueDate: z.date({
		required_error: 'Due date is required',
		invalid_type_error: 'Please enter a valid date'
	}),
	icon: z
		.custom<LucideIcon>(value => typeof value === 'function', {
			message: 'Icon must be a valid Lucide icon function'
		})
		.optional()
})
