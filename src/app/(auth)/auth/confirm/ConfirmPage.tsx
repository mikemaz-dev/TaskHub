'use client'

import { ArrowRight, Check, LoaderCircle, Mail, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Logo } from '@/components/ui/Logo'
import { createClient } from '@/utils/supabase/client'
import '@/styles/auth-confirmation.css'

export function ConfirmPage() {
	const params = useSearchParams()
	const started = useRef(false)
	const [state, setState] = useState<'verifying' | 'success' | 'error'>('verifying')
	useEffect(() => {
		if (started.current) return
		started.current = true
		async function verify() {
			const client = createClient()
			const token = params.get('token_hash')
			try {
				if (params.get('error')) { setState('error'); return }
				if (token) {
					const { error } = await client.auth.verifyOtp({ type: 'email', token_hash: token })
					if (error) { setState('error'); return }
				}
				// A callback query flag alone never proves that a session is authenticated.
				const { data, error } = await client.auth.getUser()
				setState(!error && data.user ? 'success' : 'error')
			} catch { setState('error') }
		}
		void verify()
	}, [params])
	const success = state === 'success', error = state === 'error'
	return <div className='th-auth th-confirmation'>
		<section className='th-panel th-confirmation-card'>
			<Logo />
			<div className={`th-confirmation-symbol ${state}`}>
				{success ? <Check size={30} /> : error ? <Mail size={30} /> : <LoaderCircle size={30} />}
			</div>
			<div role='status' aria-live='polite'>
				<h1>{success ? 'You’re right where you belong.' : error ? 'Let’s get you a fresh link.' : 'Opening your workspace…'}</h1>
				<p>{success ? 'Your email is confirmed. Your projects, people and next steps are ready for you.' : error ? 'This sign-in link may have expired or already been used. Request a new one to continue.' : 'We’re confirming your email and securely signing you in. Just a moment.'}</p>
			</div>
			{state !== 'verifying' && <Link className='th-button' href={success ? '/onboarding' : '/sign-in'}>
				{success ? 'Enter your workspace' : 'Send me a new link'}<ArrowRight size={16} />
			</Link>}
			<footer><ShieldCheck size={14} />A secure sign-in. A clear place to start.</footer>
		</section>
	</div>
}
