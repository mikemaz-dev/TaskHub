'use server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerProjectStatsData() {
	const client = await createClientFromServer()

	return client.from('project_stat').select('*')
}
