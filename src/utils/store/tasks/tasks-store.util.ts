import type { LucideIcon } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

import type { ISubTask } from '@/types/tasks/sub-tasks.types'

export const getNextSubTaskId = (subTasks: ISubTask[]) =>
	Math.max(...subTasks.map(st => st.id), 0) + 1

export const getIconByName = (iconName: string): LucideIcon => {
	if (!iconName) {
		return LucideIcons.Plane
	}

	const IconComponent = (LucideIcons as any)[iconName]
	if (!IconComponent) {
		return LucideIcons.Plane
	}

	return IconComponent
}
