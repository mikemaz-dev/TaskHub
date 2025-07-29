'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { signInWithEmail } from '@/app/(auth)/actions'
import { AuthSchema, type TAuthFormData } from '@/zod-schemes/auth.zod'

export const useAuthForm = () => {
	const form = useForm<TAuthFormData>({
		resolver: zodResolver(AuthSchema),
		defaultValues: {
			email: ''
		},
		mode: 'onChange'
	})

	const onSubmit = (data: TAuthFormData) => {
		signInWithEmail({ email: data.email })
			.then(() => {
				toast.success('Please check your email for verify token', {
					position: 'bottom-right',
					duration: 3500
				})
			})
			.catch(error => {
				toast.error(`Failed to send sign-in link. Please try again later. Error: ${error.message}`)
			})
			.finally(() => {
				form.reset()
			})
	}

	return {
		form,
		onSubmit
	}
}
