'use client'

import { Info } from 'lucide-react'

import { AuthForm } from '@/components/sections/auth-form/AuthForm'
import { Logo } from '@/components/ui/Logo'
import { AuroraBackground } from '@/components/ui/background/aurora-background'

export function Auth() {
	return (
		<AuroraBackground className='h-screen w-screen'>
			<div className='bg-card/80 text-foreground relative flex min-w-sm flex-col gap-6 rounded-2xl p-6 shadow-sm backdrop-blur-md'>
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
		</AuroraBackground>
	)
}
