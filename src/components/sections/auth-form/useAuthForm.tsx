'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Pages } from '@/config/public-page.config'

import { useAuthStore } from '@/store/auth.store'

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

	const onSubmit = (data: TAuthFormData) => {
		if (type !== 'login') return null

		login()

		if (isLoggedIn) {
			router.push(Pages.DASHBOARD)
			form.reset()

			toast.success(`${isLogin ? 'Logged in' : 'Signed up'} successfully!`, {
				position: 'bottom-left',
				duration: 3500
			})
		}
	}

	return {
		form,
		onSubmit,
		isLoggedIn
	}
}
