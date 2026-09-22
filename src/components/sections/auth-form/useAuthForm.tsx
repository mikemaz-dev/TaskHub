'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { signInError } from './sign-in-error'

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

	const onSubmit = async (data: TAuthFormData) => {
		try {
			const { error } = await signInWithEmail({ email: data.email })
			if (error) throw error
			toast.success('Check your inbox for your sign-in link.')
		} catch (error) {
			toast.error(signInError(error), { duration: 10000 })
		}
	}

	return {
		form,
		onSubmit
	}
}
