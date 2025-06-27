import { SectionHeading } from '@/components/ui/SectionHeading'
import { TaskItem } from '@/components/ui/TaskItem'

import { TASKS_DATA } from '@/data/tasks/tasks.data'

export function LastTasks() {
	const lastTasks = TASKS_DATA.slice(-3)

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-end gap-1'>
				<SectionHeading title='Last Tasks' />
				<span className='opacity-50 text-xl'>({lastTasks.length})</span>
			</div>
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{lastTasks.map(task => {
					return (
						<TaskItem
							key={task.id}
							task={task}
							icon={
								<task.icon
									size={20}
									absoluteStrokeWidth
								/>
							}
						/>
					)
				})}
			</div>
		</div>
	)
}
