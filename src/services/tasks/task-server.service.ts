'use server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerTodayTasks() {
	const client = await createClientFromServer()
	const { data, error } = await client
		.from('task')
		.select(`*, sub_task(*), task_participants(profile(*))`)
		.eq('due_date', new Date().toISOString().split('T')[0])

	if (error || !data) throw new Error(error?.message || 'Tasks not found')
	return data
}

export async function getServerTasks() {
	const client = await createClientFromServer()
	const { data, error } = await client
		.from('task')
		.select(`*, sub_task(*), task_participants(profile(*))`)

	if (error || !data) throw new Error(error?.message || 'Tasks not found')
	return data
}
