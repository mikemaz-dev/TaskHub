'use client'

import { Copy, Link2 } from 'lucide-react'
import { type FormEvent } from 'react'

import { HelpTip } from './HelpTip'
import type { getTeamNetwork } from '@/services/team/team-server.service'

export function TeamInvitations({
	network,
	projectId,
	setProjectId,
	invite,
	setInvite,
	setError,
	busy,
	copied,
	setCopied,
	createInvite,
	acceptInvite
}: {
	network: Awaited<ReturnType<typeof getTeamNetwork>>
	projectId: string
	setProjectId: (v: string) => void
	invite: string
	setInvite: (v: string) => void
	setError: (v: string) => void
	busy: boolean
	copied: boolean
	setCopied: (v: boolean) => void
	createInvite: () => Promise<void>
	acceptInvite: (e: FormEvent<HTMLFormElement>) => Promise<void>
}) {
	return (
		<div className='th-insights-grid'>
			<section className='th-panel th-card'>
				<h2>
					Invite a collaborator <HelpTip topic='invitation' />
				</h2>
				<p className='th-small th-muted' style={{ margin: '8px 0 20px' }}>
					Share a code for a project you own. It expires in 7 days and allows up to 10 joins.
				</p>
				<div className='th-form'>
					<label>
						Project
						<select
							value={projectId}
							onChange={e => {
								setProjectId(e.target.value)
								setInvite('')
							}}
						>
							<option value=''>Select a project</option>
							{network.projects
								.filter(
									p =>
										!p.archived_at &&
										(p.owner_id === network.userId ||
											p.project_participants.some(
												m => m.profile_id === network.userId && m.role === 'admin'
											))
								)
								.map(p => (
									<option key={p.id} value={p.id}>
										{p.name}
									</option>
								))}
						</select>
					</label>
					<button disabled={busy || !projectId} aria-busy={busy} className='th-button' onClick={createInvite}>
						<Link2 size={16} />
						{busy ? 'Working…' : 'Create invitation'}
					</button>
					{invite && (
						<div className='th-invite-code'>
							<code>{invite}</code>
							<button
								className='th-icon-button'
								aria-label='Copy invitation code'
								onClick={async () => {
									try {
										await navigator.clipboard.writeText(invite)
										setCopied(true)
									} catch {
										setError('Copy the invitation code manually.')
									}
								}}
							>
								<Copy size={16} />
							</button>
							{copied && <span className='th-small'>Copied</span>}
						</div>
					)}
				</div>
			</section>
			<section className='th-panel th-card'>
				<h2>Join a project</h2>
				<p className='th-small th-muted' style={{ margin: '8px 0 20px' }}>
					Have an invitation? Add it here to join your team.
				</p>
				<form onSubmit={acceptInvite} className='th-form'>
					<label>
						Invitation code
						<input name='code' required maxLength={128} placeholder='Paste your invitation code' />
					</label>
					<button disabled={busy} aria-busy={busy} className='th-button th-button-subtle'>
						Join project
					</button>
				</form>
			</section>
		</div>
	)
}
