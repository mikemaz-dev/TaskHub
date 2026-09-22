'use server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerTasks() {
	const client = await createClientFromServer()

	const result = await client.from('task').select(`
    *, 
    project:project_id(name, color, archived_at, completed_at),
    sub_task(*),
    task_participants(profile(*))
  `)
	return {
		...result,
		data: result.data?.filter(t => !t.project?.archived_at && !t.project?.completed_at) ?? null
	}
}
