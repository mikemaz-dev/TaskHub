import { z } from 'zod'

export const AuthSchema = z.object({
	email: z.string().email('Invalid email'),
	password: z.string().min(6, 'Password must be at least 6 characters')
})

export type TAuthFormData = z.infer<typeof AuthSchema>
