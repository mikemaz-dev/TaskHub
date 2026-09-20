'use client'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'

import { DatePicker } from './controls/DatePicker'
import { createProject } from '@/services/projects/create-project'

export function ProjectForm({ initialOpen = false }: { initialOpen?: boolean }) {
	const [open, setOpen] = useState(initialOpen)
	const [busy, setBusy] = useState(false)
	const [error, setError] = useState('')
	const router = useRouter()
	const [deadline, setDeadline] = useState('')
	const [color, setColor] = useState('#8170f2')
	async function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const form = new FormData(event.currentTarget)
		setBusy(true)
		setError('')
		try {
			const slug = await createProject({ name: String(form.get('name') || ''), color, deadline })
			setOpen(false)
			router.push(`/dashboard/projects/${slug}`)
			router.refresh()
		} catch (e) {
			setError(e instanceof Error ? e.message : 'Could not create the project.')
		} finally {
			setBusy(false)
		}
	}
	return (
		<div>
			{!open ? (
				<button onClick={() => setOpen(true)} className='th-button'>
					<Plus size={16} />
					New project
				</button>
			) : (
				<section className='th-panel th-card th-project-create'>
					<div className='th-section-title'>
						<div>
							<h2>Create a project</h2>
							<p className='th-small th-muted'>
								Give your work a home. You can add tasks and invite people next.
							</p>
						</div>
						<button onClick={() => setOpen(false)} className='th-text-link'>
							Cancel
						</button>
					</div>
					<form className='th-form' onSubmit={submit} style={{ marginTop: 20 }}>
						<label>
							Project name
							<input name='name' required maxLength={100} placeholder='Website redesign' />
						</label>
						<div className='th-form-columns'>
							<label>
								Deadline <span className='th-small th-muted'>Optional</span>
								<DatePicker
									value={deadline}
									onChange={setDeadline}
									label='Project deadline'
									optional
								/>
							</label>
							<label>
								Project color
								<div className='th-color-options'>
									{['#8170f2', '#6366f1', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'].map(c => (
										<button
											type='button'
											key={c}
											style={{ background: c }}
											aria-label={`Project color ${c}`}
											aria-pressed={color === c}
											onClick={() => setColor(c)}
										>
											{color === c ? '✓' : ''}
										</button>
									))}
								</div>
							</label>
						</div>
						{error && (
							<p className='th-error' role='alert'>
								{error}
							</p>
						)}
						<button disabled={busy} className='th-button'>
							{busy ? 'Creating…' : 'Create project'}
						</button>
					</form>
				</section>
			)}
		</div>
	)
}
