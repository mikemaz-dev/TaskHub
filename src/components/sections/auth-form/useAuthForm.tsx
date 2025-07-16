'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useAuthStore } from '@/store/auth.store'

import { signInWithEmail } from '@/app/(auth)/actions'
import type { IAuth } from '@/types/auth/auth.types'
import { AuthSchema, type TAuthFormData } from '@/zod-schemes/auth.zod'

export const useAuthForm = ({ type }: IAuth) => {
	const { login, isLoggedIn } = useAuthStore()

	const isLogin = type === 'login'

	const router = useRouter()

	const form = useForm<TAuthFormData>({
		resolver: zodResolver(AuthSchema),
		defaultValues: {
			email: '',
			password: ''
		},
		mode: 'onChange'
	})

	const onSubmit = async (data: TAuthFormData) => {
		signInWithEmail({ email: data.email })

		form.reset()

		toast.success('Please check your email for verify token', {
			position: 'bottom-left',
			duration: 3500
		})
	}

	return {
		form,
		onSubmit,
		isLoggedIn
	}
}
