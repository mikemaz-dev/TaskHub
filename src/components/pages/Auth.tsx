'use client'

import { Info } from 'lucide-react'

import { AuthForm } from '@/components/sections/auth-form/AuthForm'
import { Logo } from '@/components/ui/Logo'

export function Auth() {
	return (
		<div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600'>
			<div className='bg-card text-foreground relative flex min-w-sm flex-col gap-6 rounded-2xl p-6 shadow-sm'>
				<div className='flex flex-col gap-5'>
					<div className='flex items-center justify-between'>
						<Logo />
					</div>
					<div className='ml-1.5 flex items-center gap-1.5 opacity-65'>
						<Info
							size={18}
							absoluteStrokeWidth
						/>
						<p className='font-medium'>Sign in with magic link</p>
					</div>
				</div>
				<AuthForm />
			</div>
		</div>
	)
}
