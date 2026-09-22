'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'

import { Header } from '@/components/layout/header/Header'
import { AvatarUpload } from '@/components/sections/profile/AvatarUpload'

import { DemoWorkspace } from './DemoWorkspace'
import { WorkingHours } from './availability/WorkingHours'
import { AccountAppearance } from './AccountAppearance'
import { ProfileIdentityFields } from './ProfileIdentityFields'
import { updateClientProfile } from '@/services/profile/profile-client.service'
import type { TProfile } from '@/types/user/profile.types'

export function AccountSettings({ profile }: { profile: TProfile }) {
	const [busy, setBusy] = useState(false)
	const [error, setError] = useState('')
	const [saved, setSaved] = useState(false)
	const router = useRouter()
	async function save(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setBusy(true)
		setError('')
		setSaved(false)
		const form = new FormData(e.currentTarget)
		try {
			await updateClientProfile({
				name: String(form.get('name') || '').trim(),
				nick: String(form.get('nick') || '').trim(),
				profession: String(form.get('profession') || '').trim(),
				description: String(form.get('description') || '').trim()
			})
			setSaved(true)
			router.refresh()
		} catch (e) {
			setError(e instanceof Error ? e.message : 'Could not save your profile.')
		} finally {
			setBusy(false)
		}
	}
	return (
		<div className='th-page'>
			<Header title='Settings' />
			<div className='th-settings-grid'>
				<section className='th-panel th-card'>
					<div className='th-section-title'>
						<h2>My profile</h2>
						<Link href='/dashboard/account/profile' className='th-text-link'>
							View profile
						</Link>
					</div>
					<div style={{ marginTop: 24 }}>
						<AvatarUpload profile={profile} />
					</div>
					<form onSubmit={save} className='th-form'>
						<ProfileIdentityFields profile={profile} />
						<label>
							Work email
							<input value={profile.email} readOnly type='email' />
						</label>
						<label>
							Role or profession
							<input
								name='profession'
								maxLength={50}
								defaultValue={profile.profession ?? ''}
								placeholder='What do you do?'
							/>
						</label>
						<label>
							About you
							<textarea
								name='description'
								maxLength={500}
								rows={4}
								defaultValue={profile.description ?? ''}
								placeholder='A little about you and your work.'
							/>
						</label>
						{error && (
							<p className='th-error' role='alert'>
								{error}
							</p>
						)}
						{saved && (
							<p className='th-small' role='status'>
								Profile saved.
							</p>
						)}
						<button className='th-button' disabled={busy} aria-busy={busy}>
							{busy ? 'Saving…' : 'Save changes'}
						</button>
					</form>
				</section>
				<div className='th-settings-aside'><AccountAppearance /><WorkingHours userId={profile.id} value={profile.work_schedule} /><DemoWorkspace userId={profile.id} /></div>
			</div>
		</div>
	)
}
