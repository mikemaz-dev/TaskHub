'use client'

import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'

import { Logo } from '@/components/ui/Logo'

import { createClient } from '@/utils/supabase/client'

export function Onboarding() {
	const router = useRouter()
	const [busy, setBusy] = useState(false)
	const [error, setError] = useState('')
	async function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setBusy(true)
		setError('')
		const form = new FormData(event.currentTarget)
		try {
			const client = createClient()
			const {
				data: { user },
				error: authError
			} = await client.auth.getUser()
			if (authError || !user) throw new Error('Please sign in again.')
			const name = String(form.get('name') || '').trim()
			if (name.length < 2 || name.length > 50)
				throw new Error('Enter a name between 2 and 50 characters.')
			const { error: saveError } = await client
				.from('profile')
				.upsert({ id: user.id, name, nick: `user_${user.id.slice(0, 8)}` })
			if (saveError) throw new Error('Could not create your profile. Please try again.')
			router.replace('/dashboard/projects?create=1')
			router.refresh()
		} catch (e) {
			setError(e instanceof Error ? e.message : 'Could not save your profile.')
		} finally {
			setBusy(false)
		}
	}
	return (
		<div className='th-auth'>
			<section className='th-auth-card th-panel'>
				<Logo />
				<div>
					<p className='th-small th-muted'>A workspace of your own</p>
					<h1>What should we call you?</h1>
					<p className='th-muted'>Set up your profile, then create your first project.</p>
				</div>
				<form onSubmit={submit} className='th-form'>
					<label>
						Your name
						<input
							name='name'
							autoComplete='name'
							minLength={2}
							maxLength={50}
							required
							placeholder='Alex Morgan'
						/>
					</label>
					{error && (
						<p role='alert' className='th-error'>
							{error}
						</p>
					)}
					<button disabled={busy} className='th-button'>
						{busy ? 'Saving…' : 'Continue'}
					</button>
				</form>
			</section>
		</div>
	)
}
