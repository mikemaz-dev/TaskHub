'use server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerTodayTasks() {
	const client = await createClientFromServer()
	return client
		.from('task')
		.select(`*, sub_task(*), task_participants(profile(*))`)
		.eq('due_date', new Date().toISOString().split('T')[0])
}

export async function getServerTasks() {
	const client = await createClientFromServer()

	return client.from('task').select(`
    *,
    project:project_id(name, color),
    sub_task(*),
    task_participants(profile(*))
  `)
}
