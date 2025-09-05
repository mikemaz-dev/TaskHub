'use client'

import { useMemo, useState } from 'react'

import type { TFilterTasks, TSortingTasks, TTask } from '@/types/tasks/task.types'

type SortOrder = TSortingTasks

export const useFilterTasks = ({ tasks }: { tasks: TTask[] }) => {
	const [activeFilter, setActiveFilter] = useState<TFilterTasks>('all')
	const [sortOrder, setSortOrder] = useState<SortOrder | null>(null)

	const filteredTasks = useMemo(() => {
		if (!tasks?.length) {
			return []
		}

		let filtered = [...tasks]

		if (activeFilter !== 'all') {
			const today = new Date()
			const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

			filtered = filtered.filter(task => {
				switch (activeFilter) {
					case 'done':
						return task.sub_task.every(subTask => subTask.is_completed)
					case 'in-progress':
						return task.sub_task?.length > 0 && task.sub_task.some(subTask => !subTask.is_completed)
					case 'upcoming': {
						const date = new Date(task.due_date)
						return !isNaN(date.getTime()) && date >= today && date <= sevenDaysFromNow
					}
					default:
						return false
				}
			})
		}

		if (sortOrder !== null) {
			filtered = [...filtered].sort((a, b) => {
				const dateA = new Date(a.due_date).getTime()
				const dateB = new Date(b.due_date).getTime()
				return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
			})
		}
		return filtered
	}, [tasks, activeFilter, sortOrder])

	const getFilterButtonClass = (filterType: TFilterTasks) => {
		const baseClass =
			'px-2.5 py-1 flex items-center justify-center xs:justify-start font-medium gap-1.5 rounded-lg cursor-pointer transition-colors duration-300'
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
