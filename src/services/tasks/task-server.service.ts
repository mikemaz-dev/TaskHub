'use server'

import { createClient } from '@/utils/supabase/server'

export async function getServerTodayTasks() {
	const client = await createClient()
	return client
		.from('task')
		.select(`*, sub_task(*), task_participants(profile(*))`)
		.eq('due_date', new Date().toISOString().split('T')[0])
}

export async function getServerTasks() {
	const client = await createClient()
	return client.from('task').select(`*, sub_task(*), task_participants(profile(*))`)
}
