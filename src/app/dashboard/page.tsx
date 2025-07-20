import type { Metadata } from 'next'

import { Dashboard } from '@/pages/Dashboard'
import { TaskServerGetAll } from '@/services/tasks/task-server.service'

export const metadata: Metadata = {
	title: 'Dashboard'
}

export default async function Page() {
	const tasks = await TaskServerGetAll()

	if (tasks.error) {
		return <div className='text-red-500'>Failed to load tasks</div>
	}

	return <Dashboard tasks={tasks.data} />
}
