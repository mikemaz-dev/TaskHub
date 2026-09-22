'use client'

import { Copy, ShieldCheck, UserPlus } from 'lucide-react'

import { HelpTip } from '@/components/workspace/HelpTip'

import { ProjectRoleGuide } from './ProjectRoleGuide'
import { WorkStatus } from './availability/WorkStatus'
import { Avatar } from './Avatar'
import { Select } from './controls/Select'
import { useProjectMembers } from './useProjectMembers'
import type { getServerProjectBySlug } from '@/services/projects/project-server.service'

type Project = NonNullable<Awaited<ReturnType<typeof getServerProjectBySlug>>['data']>[number]
export function ProjectMembers({ project, userId }: { project: Project; userId: string }) {
	const { code, error, busy, copied, setCopied, setError, owner, admin, invite, role } =
		useProjectMembers(project, userId)

	return (
		<section className='th-panel th-card' id='project-members' tabIndex={-1}>
			<div className='th-section-title'>
				<h2>
					Project team <HelpTip topic='roles' />
				</h2>
				{admin && !project.archived_at && (
					<button
						className='th-button th-button-subtle'
						disabled={busy}
						onClick={() => void invite()}
					>
						<UserPlus size={16} />
						Invite to project
					</button>
				)}
			</div>

			<ProjectRoleGuide />
			{code && (
				<div className='th-invite-result'>
					<div>
						<strong>Invitation ready</strong>
						<p>
							Share this code. Your teammate can accept it on the Team page. Valid for 7 days, up to
							10 uses.
						</p>
						<code>{code}</code>
					</div>
					<button
						className='th-button th-button-subtle'
						onClick={async () => {
							try {
								await navigator.clipboard.writeText(code)
								setCopied(true)
							} catch {
								setError('Copy the invitation code manually.')
							}
						}}
					>
						<Copy size={15} />
						{copied ? 'Copied' : 'Copy code'}
					</button>
				</div>
			)}
			{error && (
				<p className='th-error' role='alert'>
					{error}
				</p>
			)}
			<div className='th-member-row'>
				<ShieldCheck size={22} />
				<strong>{owner ? 'You · Project creator' : project.owner_profile?.name || 'Project creator'}<WorkStatus value={project.owner_profile?.work_schedule} /></strong>
				<span className='th-pill'>Owner</span>
			</div>
			{project.project_participants
				.filter(m => m.profile_id !== project.owner_id)
				.map(m => (
					<div className='th-member-row' key={m.profile_id}>
						<Avatar name={m.profile?.name} path={m.profile?.avatar_path} />
						<strong>
							{m.profile?.name || 'Teammate'}
							{m.profile_id === userId ? ' · You' : ''}
							<WorkStatus value={m.profile?.work_schedule} />
						</strong>
						{owner ? (
							<div style={{ width: 130 }}>
								<Select
									label={`Role for ${m.profile?.name || 'teammate'}`}
									value={m.role || 'member'}
									options={[
										{ value: 'member', label: 'Member' },
										{ value: 'admin', label: 'Admin' }
									]}
									onChange={v => {
										if (!busy) void role(m.profile_id, v)
									}}
								/>
							</div>
						) : (
							<span className='th-pill'>{m.role || 'member'}</span>
						)}
					</div>
				))}
		</section>
	)
}
