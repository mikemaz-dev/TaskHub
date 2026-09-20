import { CalendarView } from './CalendarView'
import { getServerTasks } from '@/services/tasks/task-server.service'

export const metadata = { title: 'Schedule' }
export default async function Page() {
	const { data, error } = await getServerTasks()
	if (error) throw new Error('Could not load your schedule.')
	return <CalendarView tasks={data ?? []} />
}
