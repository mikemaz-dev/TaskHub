import { SectionHeading } from '@/components/ui/SectionHeading'
import { TaskItem } from '@/components/ui/task-item/TaskItem'

import { TASKS_DATA } from '@/data/tasks/tasks.data'

export function LastTasks() {
	const lastTasks = TASKS_DATA.slice(-3)

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-end gap-1'>
				<SectionHeading title='Last Tasks' />
				<span className='opacity-50 text-xl'>({lastTasks.length})</span>
			</div>
			<div className='grid gap-4 grid-cols-3 md:grid-cols-1 xl:grid-cols-3'>
				{lastTasks.map(task => {
					return (
						<TaskItem
							key={task.id}
							task={task}
						/>
					)
				})}
			</div>
		</div>
	)
}
