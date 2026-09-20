import { scheduleError } from '@/utils/task-schedule'
import { createClient } from '@/utils/supabase/client'

import type { TSubTaskCreate, TTaskCreate, TTaskUpdate } from '@/types/tasks/task.types'

export async function clientGetTaskById(id: string) {
	const client = createClient()
	const { data, error } = await client
		.from('task')
		.select(`*, task_participants(profile(*)), sub_task(*)`)
		.eq('id', id)
		.single()
	if (error || !data) throw new Error(error?.message || 'Task  not found')
	return data
}

export async function clientTaskUpdate(id: string, task: TTaskUpdate) {
	const { data, error } = await createClient().rpc('taskhub_save_task', {
		task_input: id,
		payload: task
	})
	if (error) throw new Error(error.message)
	return clientGetTaskById(data)
}
export async function clientCreateTask(task: TTaskCreate) {
	const issue = scheduleError(task.due_date, task.start_time)
	if (issue) throw new Error(issue.message)
	const { data, error } = await createClient().rpc('taskhub_save_task', {
		task_input: null,
		payload: task
	})
	if (error) throw new Error(error.message)
	return clientGetTaskById(data)
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
