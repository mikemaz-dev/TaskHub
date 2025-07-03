import {
	TaskCardActions,
	TaskCardHeader,
	TaskCardProgress,
	TaskCardStats
} from '@/components/ui/task-card'

import type { ITask } from '@/types/tasks/task.types'

interface ILastTasksItem {
	task: ITask
}

export function TaskCard({ task }: ILastTasksItem) {
	return (
		<div className='flex flex-col justify-between gap-3.5 overflow-hidden rounded-3xl bg-white p-4 pb-4 shadow-sm dark:bg-neutral-800'>
			<div className='flex h-full flex-col justify-around gap-3.5'>
				<TaskCardHeader task={task} />

				<TaskCardProgress task={task} />
			</div>

			<div className='flex items-center justify-between 2xl:flex-col 2xl:items-start 2xl:gap-2'>
				<div className='flex items-center justify-between'>
					<TaskCardStats task={task} />
				</div>

				<TaskCardActions task={task} />
			</div>
		</div>
	)
}
