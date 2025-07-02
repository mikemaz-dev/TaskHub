import { AnimatePresence, m } from 'motion/react'

import { LastTasksFilters } from '@/components/sections/last-tasks/LastTasksFilters'
import { DropdownButton } from '@/components/ui/DropdownButton'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TaskItem } from '@/components/ui/task-item/TaskItem'

import { useFilterTasks } from '@/hooks/useFilterTasks'

import { TaskSortingOptions } from '@/data/tasks/task-sorting-options.data'

export function LastTasks() {
	const {
		filteredTasks,
		activeFilter,
		sortOrder,
		setActiveFilter,
		setSortOrder,
		getFilterButtonClass,
		getSortLabel
	} = useFilterTasks()

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-center justify-between md:flex-col md:items-start md:gap-3'>
				<div className='flex items-end gap-1'>
					<SectionHeading title='Last Tasks' />
					<span className='opacity-50 text-xl'>({filteredTasks.length})</span>
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
			<div className='grid gap-4 grid-cols-3 md:grid-cols-1 xl:grid-cols-3'>
				<AnimatePresence mode='wait'>
					{filteredTasks.length > 0 ? (
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
								<TaskItem task={task} />
							</m.div>
						))
					) : (
						<m.div
							key={`empty-${activeFilter}-${sortOrder}`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
							className='col-span-full text-center py-8 text-neutral-500 dark:text-neutral-400'
						>
							No tasks found for the selected filter.
						</m.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
