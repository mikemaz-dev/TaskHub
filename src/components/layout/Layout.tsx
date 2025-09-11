import type { ReactNode } from 'react'

import { Sidebar } from '@/components/layout/sidebar/Sidebar'

import { Content } from './content/Content'
import { getServerAuth } from '@/services/get-server-auth'
import { TGetProjectsResponse } from '@/types/project/project.types'

export async function Layout({
	children,
	projects
}: {
	children: ReactNode
	projects: TGetProjectsResponse
}) {
	await getServerAuth()

	return (
		<main className='grid h-screen grid-cols-[275px_1fr] overflow-y-hidden xl:grid-cols-none'>
			<Sidebar projects={projects} />
			<Content>{children}</Content>
		</main>
	)
}
