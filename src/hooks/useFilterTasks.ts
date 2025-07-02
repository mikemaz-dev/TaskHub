import { useMemo, useState } from 'react'

import { TASKS_DATA } from '@/data/tasks/tasks.data'
import type { TFilterTasks } from '@/types/tasks/task.types'

export const useFilterTasks = () => {
	const [activeFilter, setActiveFilter] = useState<TFilterTasks>('all')

	const lastTasks = TASKS_DATA.slice(-3)

	const filteredTasks = useMemo(() => {
		if (activeFilter === 'all') return lastTasks

		return lastTasks.filter(task => {
			const completedSubtasks = task.subTasks.filter(subTask => subTask.isCompleted).length
			const totalSubTasks = task.subTasks.length
			const today = new Date()
			const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

			if (activeFilter === 'done') {
				return totalSubTasks && completedSubtasks === totalSubTasks
			} else if (activeFilter === 'in-progress') {
				return completedSubtasks < totalSubTasks
			} else if (activeFilter === 'upcoming') {
				return task.dueDate >= today && task.dueDate <= sevenDaysFromNow
			}

			return false
		})
	}, [lastTasks, activeFilter])

	const getFilterButtonClass = (filterType: TFilterTasks) => {
		const baseClass =
			'px-3.5 py-1 flex items-center justify-center xs:justify-start font-medium gap-1.5 rounded-xl cursor-pointer transition-colors'
		const activeClass = 'pointer-events-none bg-primary text-white'
		const inactiveClass = 'hover:bg-primary hover:text-white dark:hover:bg-neutral-750'

		return `${baseClass} ${activeFilter === filterType ? activeClass : inactiveClass}`
	}

	return {
		activeFilter,
		filteredTasks,
		setActiveFilter,
		getFilterButtonClass
	}
}
