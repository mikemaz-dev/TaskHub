import { Calendar, CircleCheck, ClockFading } from 'lucide-react'
import { m } from 'motion/react'

import { SectionHeading } from '@/components/ui/SectionHeading'
import { TaskItem } from '@/components/ui/task-item/TaskItem'

import { useFilterTasks } from '@/hooks/useFilterTasks'

export function LastTasks() {
	const { filteredTasks, activeFilter, setActiveFilter, getFilterButtonClass } = useFilterTasks()

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-center justify-between md:flex-col md:items-start md:gap-3'>
				<div className='flex items-end gap-1'>
					<SectionHeading title='Last Tasks' />
					<span className='opacity-50 text-xl'>({filteredTasks.length})</span>
				</div>
				<div className='px-1.5 py-1 flex items-center xs:grid xs:grid-cols-2 gap-1.5 bg-white rounded-2xl shadow-sm dark:bg-neutral-800'>
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
			</div>
			<div className='grid gap-4 grid-cols-3 md:grid-cols-1 xl:grid-cols-3'>
				{filteredTasks.map((task, index) => {
					return (
						<m.div
							key={`${activeFilter}-${task.id}`}
							initial={{ opacity: 0, y: 20, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -20, scale: 0.95 }}
							transition={{
								duration: 0.3,
								delay: index * 0.1,
								ease: 'easeOut'
							}}
							layout
						>
							<TaskItem task={task} />
						</m.div>
					)
				})}
			</div>
		</div>
	)
}
