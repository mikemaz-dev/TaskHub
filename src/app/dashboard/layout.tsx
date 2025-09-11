import type { PropsWithChildren } from 'react'

import { Layout } from '@/components/layout/Layout'
import { Providers } from '@/components/layout/Providers'

import { getServerAuth } from '@/services/get-server-auth'
import { getProjectsServer } from '@/services/projects/project-server.service'

export default async function DashboardLayout({ children }: PropsWithChildren) {
	await getServerAuth(true)

	const projects = await getProjectsServer()

	if (!projects.data) return

	return (
		<Layout projects={projects.data}>
			<Providers>{children}</Providers>
		</Layout>
	)
}
