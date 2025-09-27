import { z } from 'zod'

export const ProfileSchema = z.object({
	name: z
		.string()
		.min(2, 'Name must be at least 2 characters')
		.max(50, 'Name must be at most 50 characters'),
	nick: z
		.string()
		.min(3, 'Username must be at least 3 characters')
		.max(20, 'Username must be at most 20 characters')
		.regex(/^[a-zA-Z0-9_]+$/, 'Username can contain only letters, numbers, and underscores'),

	profession: z
		.string()
		.min(2, 'Profession must be at least 2 characters')
		.max(50, 'Profession must be at most 50 characters'),
	description: z
		.string()
		.max(500, 'Description must be at most 500 characters')
		.optional()
		.nullable(),
	avatar_path: z.string().url('Invalid avatar URL').optional().nullable(),
	email: z.string().email('Invalid email')
})

export type TProfileData = z.infer<typeof ProfileSchema>
