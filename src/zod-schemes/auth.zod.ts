import { z } from 'zod'

export const AuthSchema = z.object({
	email: z.string().email('Invalid email')
})

export type TAuthFormData = z.infer<typeof AuthSchema>
