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
										aria-label='Enter your email'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						className='w-full'
					>
						Send link
					</Button>
				</form>
			</Form>
		</div>
	)
}
