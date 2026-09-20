'use client'

import { createClient } from '@/utils/supabase/client'

import { useTaskChecklist } from './useTaskChecklist'
import { clientDeleteTask } from '@/services/tasks/task-client.service'

export function TaskChecklist({
	taskId,
	onDeleted,
	readOnly = false
}: {
	taskId: string
	onDeleted: () => void
	readOnly?: boolean
}) {
	const {
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
	} = useTaskChecklist(taskId, readOnly)

	return (
		<section className='th-form'>
			<h3>Checklist</h3>
			<p className='th-small th-muted'>Complete every item to finish this task.</p>
			{data?.sub_task.map(item => (
				<label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
					<input
						style={{ width: 'auto' }}
						type='checkbox'
						checked={!!item.is_completed}
						disabled={busy || readOnly}
						onChange={() =>
							void change(() =>
								createClient()
									.from('sub_task')
									.update({ is_completed: !item.is_completed })
									.eq('id', item.id)
									.select()
									.single()
							)
						}
					/>
					{item.title}
				</label>
			))}
			<form
				onSubmit={e => {
					e.preventDefault()
					if (title.trim())
						void change(async () => {
							const result = await createClient()
								.from('sub_task')
								.insert({ task_id: taskId, title: title.trim(), is_completed: false })
								.select()
								.single()
							if (!result.error) setTitle('')
							return result
						})
				}}
			>
				<label>
					Add checklist item
					<input
						maxLength={100}
						value={title}
						onChange={e => setTitle(e.target.value)}
						placeholder='A concrete next step'
					/>
				</label>
				<button className='th-button th-button-subtle' disabled={busy || readOnly || !title.trim()}>
					Add item
				</button>
			</form>
			{error && (
				<p role='alert' className='th-error'>
					{error}
				</p>
			)}
			{confirm ? (
				<div>
					<p>Delete this task and its checklist?</p>
					<button
						className='th-button'
						disabled={busy || readOnly}
						onClick={async () => {
							setBusy(true)
							try {
								await clientDeleteTask(taskId)
								router.refresh()
								onDeleted()
							} catch {
								setError('Task could not be deleted.')
								setBusy(false)
							}
						}}
					>
						Delete task
					</button>{' '}
					<button className='th-text-link' onClick={() => setConfirm(false)}>
						Cancel
					</button>
				</div>
			) : (
				<button disabled={readOnly} className='th-text-link' onClick={() => setConfirm(true)}>
					Delete task
				</button>
			)}
		</section>
	)
}
