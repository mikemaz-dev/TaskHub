import { TaskItemActions } from '@/components/ui/task-item/TaskItemActions'
import { TaskItemHeader } from '@/components/ui/task-item/TaskItemHeader'
import { TaskItemProgress } from '@/components/ui/task-item/TaskItemProgress'
import { TaskItemStats } from '@/components/ui/task-item/TaskItemStats'

import type { ITask } from '@/types/tasks/task.types'

interface ILastTasksItem {
	task: ITask
}

export function TaskItem({ task }: ILastTasksItem) {
	return (
		<div className='bg-white dark:bg-neutral-800 shadow-sm rounded-3xl p-4 pb-4 flex flex-col gap-3.5 justify-between overflow-hidden'>
			<div className='flex flex-col justify-around h-full gap-3.5'>
				<TaskItemHeader task={task} />

				<TaskItemProgress task={task} />
			</div>

			<div className='flex items-center justify-between'>
				<div className='flex items-center justify-between'>
					<TaskItemStats task={task} />
				</div>

				<TaskItemActions task={task} />
			</div>
		</div>
	)
}
