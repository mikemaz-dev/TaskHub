import { useMemo, useState } from 'react'

import { TASKS_DATA } from '@/data/tasks/tasks.data'
import type { TFilterTasks, TSortingTasks } from '@/types/tasks/task.types'

type SortOrder = TSortingTasks

export const useFilterTasks = () => {
	const [activeFilter, setActiveFilter] = useState<TFilterTasks>('all')
	const [sortOrder, setSortOrder] = useState<SortOrder>('none')

	const lastTasks = TASKS_DATA.slice(-3)

	const filteredTasks = useMemo(() => {
		let filtered = lastTasks

		if (activeFilter !== 'all') {
			const today = new Date()
			const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

			filtered = lastTasks.filter(task => {
				switch (activeFilter) {
					case 'done':
						return task.subTasks.length > 0 && task.subTasks.every(subTask => subTask.isCompleted)

					case 'in-progress':
						return task.subTasks.length > 0 && task.subTasks.some(subTask => !subTask.isCompleted)

					case 'upcoming':
						return task.dueDate >= today && task.dueDate <= sevenDaysFromNow

					default:
						return false
				}
			})
		}

		if (sortOrder !== 'none') {
			filtered = [...filtered].sort((a, b) => {
				const dateA = new Date(a.dueDate).getTime()
				const dateB = new Date(b.dueDate).getTime()

				if (sortOrder === 'asc') {
					return dateA - dateB
				} else {
					return dateB - dateA
				}
			})
		}

		return filtered
	}, [lastTasks, activeFilter, sortOrder])

	const getFilterButtonClass = (filterType: TFilterTasks) => {
		const baseClass =
			'px-3.5 py-1 flex items-center justify-center xs:justify-start font-medium gap-1.5 rounded-xl cursor-pointer transition-colors duration-300'
		const activeClass = 'pointer-events-none bg-primary text-white'
		const inactiveClass = 'hover:bg-primary hover:text-white dark:hover:bg-neutral-750'

		return `${baseClass} ${activeFilter === filterType ? activeClass : inactiveClass}`
	}

	const getSortLabel = () => {
		switch (sortOrder) {
			case 'asc':
				return 'Earliest First'
			case 'desc':
				return 'Latest First'
			default:
				return 'Sort by Deadline'
		}
	}

	return {
		activeFilter,
		filteredTasks,
		sortOrder,
		setActiveFilter,
		getFilterButtonClass,
		setSortOrder,
		getSortLabel
	}
}
