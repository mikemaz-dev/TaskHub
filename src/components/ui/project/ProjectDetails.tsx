import { formatDueDate } from '@/utils/date/date.utl'

import { TGetProjectsResponse } from '@/types/project/project.types'

export function ProjectDetails({ project }: { project: TGetProjectsResponse[0] }) {
	if (!project || !project.deadline) return null
	return (
		<div
			key={project?.id}
			className='rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-neutral-800'
		>
			<div>{formatDueDate(project.deadline)}</div>
			{project.name}
		</div>
	)
}
