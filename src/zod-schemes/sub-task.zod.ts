import { z } from 'zod'

export const SubtaskSchema = z.object({
	title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters')
})

export type TSubtaskFormData = z.infer<typeof SubtaskSchema>
