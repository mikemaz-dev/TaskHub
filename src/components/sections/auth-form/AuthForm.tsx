'use client'

import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'

import { useAuthForm } from '@/components/sections/auth-form/useAuthForm'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/components/ui'

import { Pages } from '@/config/public-page.config'

import type { IAuth } from '@/types/auth/auth.types'

export function AuthForm({ type }: IAuth) {
	const { form, isLoggedIn, onSubmit } = useAuthForm({ type })

	const router = useRouter()

	if (isLoggedIn) {
		router.push(Pages.DASHBOARD)
	}

	return (
		<div className='flex flex-col gap-8'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-6'
				>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type='email'
										placeholder='Enter your email'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='Enter your password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit'>{type === 'login' ? 'Log in' : 'Sign up'}</Button>
					<div className='flex flex-col gap-2'>
						<div className='flex items-center gap-2'>
							<p className='font-medium opacity-70'>
								{type === 'login' ? `Don't have an account?` : 'Already have an account?'}
							</p>
							<Button
								variant='link'
								className='p-0'
								onClick={() => router.push(type === 'login' ? '/signup' : '/login')}
							>
								{type === 'login' ? 'Sign up' : 'Log in'}
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	)
}
