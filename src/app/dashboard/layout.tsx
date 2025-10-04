import type { PropsWithChildren } from 'react'

import { Layout } from '@/components/layout/Layout'
import { Providers } from '@/components/layout/Providers'

import { getServerProfile } from '@/services'
import { getServerAuth } from '@/services/get-server-auth'
import { getServerProjects } from '@/services/projects/project-server.service'

export default async function DashboardLayout({ children }: PropsWithChildren) {
	await getServerAuth(true)

	const [projects, profile] = await Promise.all([getServerProjects(), getServerProfile()])

	if (!projects.data) return

	return (
		<Layout
			projects={projects.data}
			profile={profile}
		>
			<Providers>{children}</Providers>
		</Layout>
	)
}
