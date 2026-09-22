import { Dashboard } from './Dashboard'
import { getServerProjects } from '@/services/projects/project-server.service'
import { getServerTasks } from '@/services/tasks/task-server.service'

export const metadata = { title: 'Dashboard' }
export default async function Page() {
	const [tasks, projects] = await Promise.all([getServerTasks(), getServerProjects()])
	if (tasks.error || projects.error)
		throw new Error('Unable to load your workspace. Please try again.')
	return <Dashboard tasks={tasks.data ?? []} projects={projects.data ?? []} />
}
