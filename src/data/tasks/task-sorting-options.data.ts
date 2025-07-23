import type { IDropdownItem } from '@/types/dropdown/dropdown-item.types'
import type { TSortingTasks } from '@/types/tasks/task.types'

export const TaskSortingOptions = (
	setSortOrder: (order: TSortingTasks | null) => void
): IDropdownItem[] => [
	{
		label: 'No Sorting',
		onClick: () => setSortOrder(null)
	},
	{
		label: 'Earliest First',
		onClick: () => setSortOrder('asc')
	},
	{
		label: 'Latest First',
		onClick: () => setSortOrder('desc')
	}
]
