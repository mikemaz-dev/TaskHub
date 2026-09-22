import { Analytics } from '@/components/workspace/Analytics'

import { getServerProjects } from '@/services/projects/project-server.service'
import { getServerTasks } from '@/services/tasks/task-server.service'

export const metadata = { title: 'Insights & analytics' }
export default async function Page() {
	const [tasks, projects] = await Promise.all([getServerTasks(), getServerProjects()])
	if (tasks.error || projects.error) throw new Error('Could not load analytics.')
	return <Analytics tasks={tasks.data ?? []} projects={projects.data ?? []} />
}
