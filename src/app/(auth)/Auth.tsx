'use client'

import Link from 'next/link'

import { AuthForm } from '@/components/sections/auth-form/AuthForm'
import { Logo } from '@/components/ui/Logo'

export function Auth() {
	return (
		<div className='th-auth'>
			<div className='th-auth-card th-panel'>
				<Logo />
				<div>
					<h1>
						A little more focus.
						<br />A lot more progress.
					</h1>
					<p className='th-muted'>
						Sign in or create your account with a secure email link. No password to remember.
					</p>
				</div>
				<AuthForm />
				<p className='th-small th-muted'>Your projects and conversations stay in your workspace.</p>
				<Link href='/' className='th-text-link'>
					Back to TaskHub
				</Link>
			</div>
		</div>
	)
}
