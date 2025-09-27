import { getProjectsServer } from '@/services/projects/project-server.service'

export interface IProject {
	id: string
	name: string | null
	color: string | null
}

export type TGetProjectsResponse = NonNullable<
	Awaited<ReturnType<typeof getProjectsServer>>['data']
>
