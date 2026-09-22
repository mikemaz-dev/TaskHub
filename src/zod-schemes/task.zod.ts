import { z } from 'zod'

export const TaskSchema = z
	.object({
		title: z
			.string()
			.trim()
			.min(1, 'Title is required')
			.max(100, 'Title must be less than 100 characters'),
		due_date: z.string().refine(date => !isNaN(Date.parse(date)), {
			message: 'Invalid date format'
		}),
		start_time: z
			.string()
			.refine(
				v => !v || /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
				'Use 24-hour time, e.g. 09:30'
			),
		end_time: z
			.string()
			.refine(
				v => !v || /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
				'Use 24-hour time, e.g. 10:30'
			),
		icon: z.string().min(1, 'Icon is required'),
		project_id: z.string().min(1),
		participants: z.array(z.string().uuid()).optional()
	})
	.refine(data => !data.end_time || (!!data.start_time && data.end_time > data.start_time), {
		message: 'End time must be after start time',
		path: ['end_time']
	})

export type TTaskFormData = z.infer<typeof TaskSchema>
