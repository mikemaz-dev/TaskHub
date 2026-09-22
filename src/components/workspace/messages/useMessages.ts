'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { createClient } from '@/utils/supabase/client'

import { useTyping } from './useTyping'
import { useConversation } from './useConversation'
import { useReadReceipts } from './useReadReceipts'
import type { getTeamNetwork } from '@/services/team/team-server.service'

export type Network = Awaited<ReturnType<typeof getTeamNetwork>>
export function useMessages(network: Network) {
	const params = useSearchParams()
	const sendLock = useRef(false)
	const requestedProject = network.projects.find(p => p.id === params.get('project'))
	const contacts = network.members.filter(m => m.id !== network.userId && (!requestedProject ||
		requestedProject.owner_id === m.id || requestedProject.project_participants.some(p => p.profile?.id === m.id)))
	const [contactId, setContactId] = useState(
		contacts.find(c => c.id === params.get('contact'))?.id || contacts[0]?.id || ''
	)
	const [query, setQuery] = useState('')
	const [drafts, setDrafts] = useState<Record<string, string>>({})
	const [busy, setBusy] = useState(false)
	const endRef = useRef<HTMLDivElement>(null)
	const [client] = useState(() => createClient())
	const contact = contacts.find(m => m.id === contactId)
	const sharedProjects = network.projects.filter(
		p => p.owner_id === contactId || p.project_participants.some(m => m.profile?.id === contactId)
	)
	const [selectedProject, setSelectedProject] = useState(requestedProject?.id || 'general')
	const projectId = selectedProject === 'general' ? 'general' : sharedProjects.some(p => p.id === selectedProject)
		? selectedProject
		: sharedProjects[0]?.id || ''
	const { typing, notify: notifyTyping } = useTyping(network.userId, contactId, projectId)
	const draftKey = `${contactId}:${projectId}`
	const body = drafts[draftKey] || ''
	const setBody = (value: string) => setDrafts(previous => ({ ...previous, [draftKey]: value }))
	const { messages, loading, error, setError, refresh } = useConversation(
		client,
		contactId,
		network.userId,
		projectId
	)
	useEffect(() => {
		endRef.current?.scrollIntoView({ block: 'nearest' })
	}, [messages.length, projectId, contactId])
	useReadReceipts(client, messages, network.userId)

	async function send() {
		const text = body.trim()
		if (!text || !contact || !projectId || busy || sendLock.current) return
		sendLock.current = true
		setBusy(true)
		setError('')
		notifyTyping(false)
		try {
			const { error } = await client.from('taskhub_direct_message').insert({
				project_id: projectId === 'general' ? null : projectId,
				sender_id: network.userId,
				recipient_id: contact.id,
				body: text
			})
			if (error) throw error
			setBody('')
			await refresh()
		} catch {
			setError('Message was not sent. Your draft is saved here — please try again.')
		} finally {
			sendLock.current = false
			setBusy(false)
		}
	}

	return {
		requestedProject,
		typing, notifyTyping,
		contacts,
		contactId,
		setContactId,
		query,
		setQuery,
		contact,
		messages,
		body,
		setBody,
		error,
		busy,
		loading,
		endRef,
		sharedProjects,
		projectId,
		setSelectedProject,
		refresh,
		send
	}
}
export type MessageContext = ReturnType<typeof useMessages>
