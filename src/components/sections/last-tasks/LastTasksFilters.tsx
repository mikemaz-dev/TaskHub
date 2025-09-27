import { Calendar, CircleCheck, ClockFading } from 'lucide-react'
import { memo } from 'react'

import type { TFilterTasks } from '@/types/tasks/task.types'

interface ILastTasksFiltering {
	getFilterButtonClass: (type: TFilterTasks) => string
	setActiveFilter: (type: TFilterTasks) => void
}

function LastTasksFilters({ getFilterButtonClass, setActiveFilter }: ILastTasksFiltering) {
	return (
		<div className='xs:grid xs:grid-cols-2 text-foreground flex items-center gap-1 base-round bg-white px-1.5 py-1 shadow-sm select-none dark:bg-secondary/30'>
			<button
				className={getFilterButtonClass('all')}
				onClick={() => setActiveFilter('all')}
				aria-label='View all tasks'
			>
				All
			</button>
			<button
				className={getFilterButtonClass('done')}
				onClick={() => setActiveFilter('done')}
				aria-label='View done tasks'
			>
				<CircleCheck
					size={17}
					absoluteStrokeWidth
				/>
				Done
			</button>
			<button
				className={getFilterButtonClass('in-progress')}
				onClick={() => setActiveFilter('in-progress')}
				aria-label='View tasks in progress'
			>
				<ClockFading
					size={17}
					absoluteStrokeWidth
				/>
				In progress
			</button>
			<button
				className={getFilterButtonClass('upcoming')}
				onClick={() => setActiveFilter('upcoming')}
				aria-label='View upcoming tasks'
			>
				<Calendar
					size={17}
					absoluteStrokeWidth
				/>
				Upcoming
			</button>
		</div>
	)
}

export default memo(LastTasksFilters)
