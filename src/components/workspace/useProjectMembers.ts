'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { createClient } from '@/utils/supabase/client'

import type { getServerProjectBySlug } from '@/services/projects/project-server.service'

type Project = NonNullable<Awaited<ReturnType<typeof getServerProjectBySlug>>['data']>[number]
export function useProjectMembers(project: Project, userId: string) {
	const [code, setCode] = useState('')
	const [error, setError] = useState('')
	const [busy, setBusy] = useState(false)
	const [copied, setCopied] = useState(false)
	const router = useRouter()
	const owner = project.owner_id === userId
	const admin =
		owner || project.project_participants.some(m => m.profile_id === userId && m.role === 'admin')
	async function invite() {
		if (!admin || project.archived_at) return
		setBusy(true)
		setError('')
		const { data, error } = await createClient().rpc('taskhub_create_invite', {
			project_input: project.id
		})
		setBusy(false)
		if (error) setError('Could not create an invitation. Check project permissions and try again.')
		else {
			setCode(data)
			setCopied(false)
		}
	}
	async function role(profileId: string, value: string) {
		setBusy(true)
		const { error } = await createClient().rpc('taskhub_set_member_role', {
			project_input: project.id,
			profile_input: profileId,
			role_input: value
		})
		setBusy(false)
		if (error) setError('Role could not be changed. Only the project creator can change roles.')
		else router.refresh()
	}
	return { code, error, busy, copied, setCopied, setError, owner, admin, invite, role }
}
