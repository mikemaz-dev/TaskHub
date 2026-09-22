'use client'

import { Users } from 'lucide-react'
import Link from 'next/link'

import { Header } from '@/components/layout/header/Header'

import { TeamDirectory } from './TeamDirectory'
import { TeamInvitations } from './TeamInvitations'
import { useTeamInvitations } from './useTeamInvitations'
import type { getTeamNetwork } from '@/services/team/team-server.service'

export function Team({ network }: { network: Awaited<ReturnType<typeof getTeamNetwork>> }) {
	const {
		projectId,
		setProjectId,
		invite,
		setInvite,
		error,
		setError,
		busy,
		copied,
		setCopied,
		createInvite,
		acceptInvite
	} = useTeamInvitations(network)

	return (
		<div className='th-page'>
			<Header title='Team network' />
			<div className='th-team-heading'>
				<div>
					<h2>Good work happens together.</h2>
					<p className='th-muted th-small'>People you share projects with.</p>
				</div>
				<span className='th-pill'>{network.members.length} members</span>
			</div>
			<TeamDirectory network={network} />
			{!network.members.length && (
				<div className='th-panel th-empty'>
					<Users size={30} style={{ margin: '0 auto 12px' }} />
					<h3>Bring your people together.</h3>
					<p>Create a project, then share an invitation.</p>
					<Link className='th-button' href='/dashboard/projects?create=1'>
						Create a project
					</Link>
				</div>
			)}
			<TeamInvitations
				network={network}
				projectId={projectId}
				setProjectId={setProjectId}
				invite={invite}
				setInvite={setInvite}
				setError={setError}
				busy={busy}
				copied={copied}
				setCopied={setCopied}
				createInvite={createInvite}
				acceptInvite={acceptInvite}
			/>
			{error && (
				<p className='th-error' role='alert'>
					{error}
				</p>
			)}
		</div>
	)
}
