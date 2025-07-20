'use server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function TaskServerGetAll() {
	return (await createClientFromServer()).from('task').select(`*, sub_task(*)`)
}
