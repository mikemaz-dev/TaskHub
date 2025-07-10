import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

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

import { AuthSchema, type TAuthFormData } from '@/zod-schemes/auth.zod'

export function AuthForm() {
	const [authType, setAuthType] = useState<'login' | 'signup'>('login')

	const form = useForm<TAuthFormData>({
		resolver: zodResolver(AuthSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = (data: TAuthFormData): void => {
		console.log(data)
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
										placeholder='Enter your password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<div className='flex flex-col gap-2'>
				<Button type='submit'>{authType === 'login' ? 'Login' : 'Sign Up'}</Button>
				<div className='flex items-center gap-2'>
					<p className='font-medium opacity-70'>
						{authType === 'login' ? `Don't have an account?` : 'Already have an account?'}
					</p>
					<Button
						variant='link'
						className='p-0'
						onClick={() => setAuthType(authType === 'login' ? 'signup' : 'login')}
					>
						{authType === 'login' ? 'Sign up' : 'Log in'}
					</Button>
				</div>
			</div>
		</div>
	)
}
