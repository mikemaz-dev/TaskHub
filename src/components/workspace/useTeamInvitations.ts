import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'

import { createClient } from '@/utils/supabase/client'

import type { getTeamNetwork } from '@/services/team/team-server.service'

export function useTeamInvitations(network: Awaited<ReturnType<typeof getTeamNetwork>>) {
	const [projectId, setProjectId] = useState(
		network.projects.find(
			p =>
				!p.archived_at &&
				(p.owner_id === network.userId ||
					p.project_participants.some(m => m.profile_id === network.userId && m.role === 'admin'))
		)?.id ?? ''
	)
	const [invite, setInvite] = useState('')
	const [error, setError] = useState('')
	const [busy, setBusy] = useState(false)
	const [copied, setCopied] = useState(false)
	const router = useRouter()
	async function createInvite() {
		if (!projectId) return
		setBusy(true)
		setError('')
		try {
			const { data: code, error } = await createClient().rpc('taskhub_create_invite', {
				project_input: projectId
			})
			if (error)
				throw new Error(
					'Could not create an invitation. Only the project creator or admin can invite people.'
				)
			setInvite(code)
			setCopied(false)
		} catch (e) {
			setError(e instanceof Error ? e.message : 'Could not create invitation')
		} finally {
			setBusy(false)
		}
	}
	async function acceptInvite(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setBusy(true)
		setError('')
		const code = String(new FormData(e.currentTarget).get('code') || '').trim()
		try {
			const { error } = await createClient().rpc('taskhub_accept_project_invite', {
				code_input: code
			})
			if (error)
				throw new Error(
					'This invitation could not be accepted. It may have expired or reached its limit.'
				)
			router.refresh()
		} catch (e) {
			setError(e instanceof Error ? e.message : 'Could not accept invitation')
		} finally {
			setBusy(false)
		}
	}
	return {
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
	}
}
