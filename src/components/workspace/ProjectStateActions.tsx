'use client'

import { Archive, CheckCircle2, RotateCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { createClient } from '@/utils/supabase/client'

export function ProjectStateActions({
	id,
	archived,
	completed,
	role
}: {
	id: string
	archived?: boolean
	completed?: boolean
	role: string
}) {
	const [busy, setBusy] = useState(false)
	const [error, setError] = useState('')
	const router = useRouter()
	async function action(value: string) {
		setBusy(true)
		setError('')
		const { error } = await createClient().rpc('taskhub_project_state', {
			project_input: id,
			action_input: value
		})
		setBusy(false)
		if (error)
			setError('The project status could not be changed. Check your permissions and try again.')
		else router.refresh()
	}
	if (!['owner', 'admin'].includes(role)) return null
	return (
		<div className='th-state-actions'>
			{archived ? (
				role === 'owner' && (
					<button
						className='th-button th-button-subtle'
						disabled={busy}
						onClick={() => void action('restore')}
					>
						<RotateCcw size={15} />
						Restore project
					</button>
				)
			) : (
				<>
					<button
						className='th-button th-button-subtle'
						disabled={busy}
						onClick={() => void action(completed ? 'reopen' : 'complete')}
					>
						<CheckCircle2 size={15} />
						{completed ? 'Reopen project' : 'Complete project'}
					</button>
					{role === 'owner' && (
						<button
							className='th-button th-button-subtle'
							disabled={busy}
							onClick={() => void action('archive')}
						>
							<Archive size={15} />
							Archive project
						</button>
					)}
				</>
			)}
			{error && (
				<p className='th-error' role='alert'>
					{error}
				</p>
			)}
		</div>
	)
}
