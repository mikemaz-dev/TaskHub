import { AnimatePresence, m } from 'motion/react'

import { useFilterTasks } from '@/components/sections/last-tasks/useFilterTasks'
import DropdownButton from '@/components/ui/DropdownButton'
import SectionHeading from '@/components/ui/SectionHeading'
import TaskCard from '@/components/ui/task-card/TaskCard'

import { formatCount } from '@/utils/formatCount'

import LastTasksFilters from './LastTasksFilters'
import { TaskSortingOptions } from '@/data/tasks/task-sorting-options.data'
import type { TTask } from '@/types/tasks/task.types'

export function LastTasks({ tasks }: { tasks: TTask[] }) {
	const {
		filteredTasks,
		activeFilter,
		sortOrder,
		setActiveFilter,
		setSortOrder,
		getFilterButtonClass,
		getSortLabel
	} = useFilterTasks({ tasks })

	return (
		<div className='flex flex-col gap-5.5'>
			<div className='flex items-center justify-between md:flex-col md:items-start md:gap-3'>
				<div className='flex items-end gap-1'>
					<SectionHeading title='Last Tasks' />
					<span className='text-xl opacity-50'>({formatCount(filteredTasks.length)})</span>
				</div>
				<div className='flex items-center gap-4 sm:flex-col sm:items-start'>
					<LastTasksFilters
						setActiveFilter={setActiveFilter}
						getFilterButtonClass={getFilterButtonClass}
					/>
					<DropdownButton
						items={TaskSortingOptions(setSortOrder)}
						placeholder={getSortLabel()}
					/>
				</div>
			</div>
			<div className='grid grid-cols-3 gap-4 md:grid-cols-1 xl:grid-cols-3'>
				<AnimatePresence mode='wait'>
					{filteredTasks.length > 1 ? (
						filteredTasks.map((task, index) => (
							<m.div
								key={`${activeFilter}-${sortOrder}-${task.id}`}
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
								<TaskCard task={task} />
							</m.div>
						))
					) : (
						<m.div
							key={`empty-${activeFilter}-${sortOrder}`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
							className='col-span-full py-8 text-center text-neutral-500 dark:text-neutral-400'
						>
							No tasks found for the selected filter.
						</m.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
