import { Calendar, CircleCheck, ClockFading } from 'lucide-react'

import type { TFilterTasks } from '@/types/tasks/task.types'

interface ILastTasksFiltering {
	getFilterButtonClass: (type: TFilterTasks) => string
	setActiveFilter: (type: TFilterTasks) => void
}

export function LastTasksFilters({ getFilterButtonClass, setActiveFilter }: ILastTasksFiltering) {
	return (
		<div className='px-1.5 py-1 flex items-center xs:grid xs:grid-cols-2 gap-1.5 select-none bg-white rounded-2xl shadow-sm dark:bg-neutral-800'>
			<button
				className={getFilterButtonClass('all')}
				onClick={() => setActiveFilter('all')}
			>
				All
			</button>
			<button
				className={getFilterButtonClass('done')}
				onClick={() => setActiveFilter('done')}
			>
				<CircleCheck
					size={18}
					absoluteStrokeWidth
				/>
				Done
			</button>
			<button
				className={getFilterButtonClass('in-progress')}
				onClick={() => setActiveFilter('in-progress')}
			>
				<ClockFading
					size={18}
					absoluteStrokeWidth
				/>
				In progress
			</button>
			<button
				className={getFilterButtonClass('upcoming')}
				onClick={() => setActiveFilter('upcoming')}
			>
				<Calendar
					size={18}
					absoluteStrokeWidth
				/>
				Upcoming
			</button>
		</div>
	)
}
