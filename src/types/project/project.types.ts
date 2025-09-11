import { getProjectsServer } from '@/services/projects/project-server.service'

export interface IProject {
	id: string
	name: string
	color: string
}

export type TGetProjectsResponse = NonNullable<
	Awaited<ReturnType<typeof getProjectsServer>>['data']
>
