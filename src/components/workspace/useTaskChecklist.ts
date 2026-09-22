import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { clientGetTaskById } from '@/services/tasks/task-client.service'

export function useTaskChecklist(taskId: string, readOnly: boolean) {
	const { data } = useQuery({
		queryKey: ['task', taskId],
		queryFn: () => clientGetTaskById(taskId)
	})
	const [title, setTitle] = useState('')
	const [busy, setBusy] = useState(false)
	const [error, setError] = useState('')
	const [confirm, setConfirm] = useState(false)
	const cache = useQueryClient()
	const router = useRouter()
	async function change(action: () => PromiseLike<{ error: { message: string } | null }>) {
		if (readOnly || busy) return
		setBusy(true)
		setError('')
		try {
			const result = await action()
			if (result.error) throw result.error
			await cache.invalidateQueries({ queryKey: ['task', taskId] })
			router.refresh()
		} catch {
			setError('Could not save the checklist. Please try again.')
		} finally {
			setBusy(false)
		}
	}
	return {
		data,
		title,
		setTitle,
		busy,
		setBusy,
		error,
		setError,
		confirm,
		setConfirm,
		router,
		change
	}
}
