'use client'

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

export function AuthForm() {
	const { form, onSubmit } = useAuthForm()

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
					<div className='flex w-full flex-col gap-3'>
						<Button
							type='submit'
							className='w-full'
						>
							Send link
						</Button>
						<p className='ml-1.5 opacity-65'>Then, check your email for verify token.</p>
					</div>
				</form>
			</Form>
		</div>
	)
}
