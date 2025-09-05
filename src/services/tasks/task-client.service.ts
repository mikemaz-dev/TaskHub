import { createClient } from '@/utils/supabase/client'

import type { TSubTaskCreate, TTaskCreate, TTaskUpdate } from '@/types/tasks/task.types'

export async function clientGetTaskById(id: string) {
	const client = createClient()
	const { data, error } = await client.from('task').select(`*, sub_task(*)`).eq('id', id).single()
	if (error || !data) throw new Error(error?.message || 'Task  not found')
	return data
}

export async function clientTaskUpdate(id: string, task: TTaskUpdate) {
	const client = createClient()
	const { data, error } = await client
		.from('task')
		.update(task)
		.eq('id', id)
		.select(`*, sub_task(*)`)
		.single()
	if (error || !data) throw new Error(error?.message || 'Task not found')
	return data
}

export async function clientCreateTask(task: TTaskCreate) {
	const client = createClient()

	const {
		data: { user },
		error: authError
	} = await client.auth.getUser()
	if (authError || !user) {
		throw new Error(authError?.message || 'User not authenticated')
	}

	const { data, error } = await client
		.from('task')
		.insert({ ...task, owner_id: user.id })
		.select(`*, sub_task(*)`)
		.single()

	if (error || !data) throw new Error(error?.message || 'Failed to create task')
	return data
}

export async function clientDeleteTask(id: string) {
	const client = createClient()
	const { data, error } = await client
		.from('task')
		.delete()
		.eq('id', id)
		.select(`*, sub_task(*)`)
		.single()

	if (error || !data) throw new Error(error?.message || 'Task not found')
	return data
}

export async function clientCreateSubTask(taskId: string, subTask: TSubTaskCreate) {
	const client = createClient()
	const { data, error } = await client
		.from('sub_task')
		.insert({ ...subTask, task_id: taskId })
		.select('*')
		.single()

	if (error || !data) throw new Error(error?.message || 'Task not found')
	return data
}
